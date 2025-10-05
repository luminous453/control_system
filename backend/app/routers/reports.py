from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import datetime, timedelta
import csv
import io

from ..database import get_db
from ..models.defects import Defect as DefectModel, DefectStatus as DefectStatusModel
from ..models.projects import Project as ProjectModel
from ..models.users import User as UserModel
from ..utils.auth import get_current_active_user, require_role

router = APIRouter()

@router.get("/analytics")
async def get_analytics(
    project_id: int = None,
    days: int = 30,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить аналитические данные по дефектам"""
    # Проверяем права доступа
    if current_user.role.name == "Инженер":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Недостаточно прав для просмотра аналитики"
        )
    
    # Определяем период
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    
    # Базовый запрос
    query = db.query(DefectModel).filter(
        DefectModel.created_at >= start_date,
        DefectModel.created_at <= end_date
    )
    
    # Фильтр по проекту, если указан
    if project_id:
        query = query.filter(DefectModel.project_id == project_id)
    
    # Статистика по статусам
    status_stats = db.query(
        DefectStatusModel.name,
        func.count(DefectModel.id).label('count')
    ).join(DefectModel).filter(
        DefectModel.created_at >= start_date,
        DefectModel.created_at <= end_date
    )
    
    if project_id:
        status_stats = status_stats.filter(DefectModel.project_id == project_id)
    
    status_stats = status_stats.group_by(DefectStatusModel.name).all()
    
    # Статистика по приоритетам
    priority_stats = query.with_entities(
        DefectModel.priority,
        func.count(DefectModel.id).label('count')
    ).group_by(DefectModel.priority).all()
    
    # Статистика по проектам (если не фильтруем по конкретному проекту)
    project_stats = []
    if not project_id:
        project_stats = db.query(
            ProjectModel.name,
            func.count(DefectModel.id).label('count')
        ).join(DefectModel).filter(
            DefectModel.created_at >= start_date,
            DefectModel.created_at <= end_date
        ).group_by(ProjectModel.name).all()
    
    # Статистика по дням (последние 7 дней)
    daily_stats = []
    for i in range(7):
        day_start = (end_date - timedelta(days=i)).replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        
        daily_query = db.query(func.count(DefectModel.id)).filter(
            DefectModel.created_at >= day_start,
            DefectModel.created_at < day_end
        )
        
        if project_id:
            daily_query = daily_query.filter(DefectModel.project_id == project_id)
        
        count = daily_query.scalar() or 0
        daily_stats.append({
            "date": day_start.strftime("%Y-%m-%d"),
            "count": count
        })
    
    # Общие метрики
    total_defects = query.count()
    open_defects = query.join(DefectStatusModel).filter(
        DefectStatusModel.name.in_(["Новая", "В работе", "На проверке"])
    ).count()
    closed_defects = query.join(DefectStatusModel).filter(
        DefectStatusModel.name.in_(["Закрыта", "Отменена"])
    ).count()
    
    return {
        "period": {
            "start_date": start_date.isoformat(),
            "end_date": end_date.isoformat(),
            "days": days
        },
        "project_id": project_id,
        "metrics": {
            "total_defects": total_defects,
            "open_defects": open_defects,
            "closed_defects": closed_defects,
            "completion_rate": round((closed_defects / total_defects * 100) if total_defects > 0 else 0, 2)
        },
        "status_distribution": [{"status": name, "count": count} for name, count in status_stats],
        "priority_distribution": [
            {"priority": priority, "count": count, "label": {1: "Низкий", 2: "Средний", 3: "Высокий"}.get(priority, "Неизвестно")}
            for priority, count in priority_stats
        ],
        "project_distribution": [{"project": name, "count": count} for name, count in project_stats],
        "daily_stats": daily_stats[::-1]  # Разворачиваем, чтобы старые даты были первыми
    }

@router.get("/defects-by-executor")
async def get_defects_by_executor(
    project_id: int = None,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(require_role("Менеджер"))
):
    """Получить статистику дефектов по исполнителям (только для менеджеров)"""
    query = db.query(
        UserModel.full_name,
        func.count(DefectModel.id).label('total_defects'),
        func.count(
            func.case(
                [(DefectStatusModel.name.in_(["Закрыта", "Отменена"]), 1)],
                else_=None
            )
        ).label('completed_defects')
    ).join(
        DefectModel, UserModel.id == DefectModel.executor_id
    ).join(
        DefectStatusModel, DefectModel.status_id == DefectStatusModel.id
    )
    
    if project_id:
        query = query.filter(DefectModel.project_id == project_id)
    
    results = query.group_by(UserModel.full_name).all()
    
    executor_stats = []
    for full_name, total, completed in results:
        completion_rate = round((completed / total * 100) if total > 0 else 0, 2)
        executor_stats.append({
            "executor": full_name,
            "total_defects": total,
            "completed_defects": completed,
            "in_progress_defects": total - completed,
            "completion_rate": completion_rate
        })
    
    return {
        "project_id": project_id,
        "executor_statistics": executor_stats
    }

@router.get("/export/csv")
async def export_defects_csv(
    project_id: int = None,
    status_id: int = None,
    priority: int = None,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Экспортировать дефекты в CSV"""
    # Проверяем права доступа
    if current_user.role.name == "Инженер":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Недостаточно прав для экспорта данных"
        )
    
    # Формируем запрос
    query = db.query(
        DefectModel.id,
        DefectModel.description,
        ProjectModel.name.label('project_name'),
        UserModel.full_name.label('reporter_name'),
        func.coalesce(UserModel.full_name, 'Не назначен').label('executor_name'),
        DefectStatusModel.name.label('status_name'),
        DefectModel.priority,
        DefectModel.deadline,
        DefectModel.created_at,
        DefectModel.updated_at
    ).join(
        ProjectModel, DefectModel.project_id == ProjectModel.id
    ).join(
        UserModel, DefectModel.reporter_id == UserModel.id
    ).outerjoin(
        UserModel, DefectModel.executor_id == UserModel.id
    ).join(
        DefectStatusModel, DefectModel.status_id == DefectStatusModel.id
    )
    
    # Применяем фильтры
    if project_id:
        query = query.filter(DefectModel.project_id == project_id)
    if status_id:
        query = query.filter(DefectModel.status_id == status_id)
    if priority:
        query = query.filter(DefectModel.priority == priority)
    
    defects = query.all()
    
    # Создаем CSV в памяти
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Заголовки
    writer.writerow([
        'ID',
        'Описание',
        'Проект',
        'Автор',
        'Исполнитель',
        'Статус',
        'Приоритет',
        'Срок',
        'Создан',
        'Обновлен'
    ])
    
    # Данные
    priority_labels = {1: 'Низкий', 2: 'Средний', 3: 'Высокий'}
    
    for defect in defects:
        writer.writerow([
            defect.id,
            defect.description,
            defect.project_name,
            defect.reporter_name,
            defect.executor_name,
            defect.status_name,
            priority_labels.get(defect.priority, 'Неизвестно'),
            defect.deadline.strftime('%d.%m.%Y') if defect.deadline else '',
            defect.created_at.strftime('%d.%m.%Y %H:%M'),
            defect.updated_at.strftime('%d.%m.%Y %H:%M')
        ])
    
    output.seek(0)
    
    # Возвращаем CSV файл
    response = StreamingResponse(
        io.BytesIO(output.getvalue().encode('utf-8-sig')),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=defects_export.csv"}
    )
    
    return response
