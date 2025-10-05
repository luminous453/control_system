from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
import os
import uuid
from datetime import datetime

from ..database import get_db
from ..schemas.defects import (
    Defect, DefectCreate, DefectUpdate, DefectWithDetails,
    DefectStatus, DefectStatusCreate, DefectComment, DefectCommentCreate,
    DefectAttachment, DefectFilter
)
from ..models.defects import (
    Defect as DefectModel, DefectStatus as DefectStatusModel,
    DefectComment as DefectCommentModel, DefectAttachment as DefectAttachmentModel
)
from ..models.users import User as UserModel
from ..models.projects import Project as ProjectModel
from ..utils.auth import get_current_active_user, require_role
from ..config import settings

router = APIRouter()

# Роуты для статусов дефектов
@router.get("/statuses", response_model=List[DefectStatus])
async def get_defect_statuses(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить список статусов дефектов"""
    statuses = db.query(DefectStatusModel).all()
    return statuses

@router.post("/statuses", response_model=DefectStatus)
async def create_defect_status(
    status: DefectStatusCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(require_role("Менеджер"))
):
    """Создать новый статус дефекта (только для менеджеров)"""
    existing_status = db.query(DefectStatusModel).filter(DefectStatusModel.name == status.name).first()
    if existing_status:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Статус с таким именем уже существует"
        )
    
    db_status = DefectStatusModel(name=status.name)
    db.add(db_status)
    db.commit()
    db.refresh(db_status)
    return db_status

# Роуты для дефектов
@router.get("/", response_model=List[Defect])
async def get_defects(
    project_id: int = None,
    status_id: int = None,
    priority: int = None,
    executor_id: int = None,
    reporter_id: int = None,
    search: str = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить список дефектов с фильтрацией"""
    query = db.query(DefectModel)
    
    # Применяем фильтры
    if project_id:
        query = query.filter(DefectModel.project_id == project_id)
    if status_id:
        query = query.filter(DefectModel.status_id == status_id)
    if priority:
        query = query.filter(DefectModel.priority == priority)
    if executor_id:
        query = query.filter(DefectModel.executor_id == executor_id)
    if reporter_id:
        query = query.filter(DefectModel.reporter_id == reporter_id)
    if search:
        query = query.filter(DefectModel.description.ilike(f"%{search}%"))
    
    # Для инженеров показываем только их дефекты
    if current_user.role.name == "Инженер":
        query = query.filter(
            or_(
                DefectModel.reporter_id == current_user.id,
                DefectModel.executor_id == current_user.id
            )
        )
    
    defects = query.offset(skip).limit(limit).all()
    return defects

@router.get("/{defect_id}", response_model=DefectWithDetails)
async def get_defect(
    defect_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить дефект по ID с комментариями и вложениями"""
    defect = db.query(DefectModel).filter(DefectModel.id == defect_id).first()
    if not defect:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Дефект не найден"
        )
    
    # Проверяем права доступа для инженеров
    if current_user.role.name == "Инженер":
        if defect.reporter_id != current_user.id and defect.executor_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Недостаточно прав для просмотра этого дефекта"
            )
    
    return defect

@router.post("/", response_model=Defect)
async def create_defect(
    defect: DefectCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Создать новый дефект"""
    # Проверяем существование проекта
    project = db.query(ProjectModel).filter(ProjectModel.id == defect.project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Указанный проект не найден"
        )
    
    # Проверяем существование исполнителя, если указан
    if defect.executor_id:
        executor = db.query(UserModel).filter(UserModel.id == defect.executor_id).first()
        if not executor:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Указанный исполнитель не найден"
            )
    
    # Проверяем существование статуса
    status_obj = db.query(DefectStatusModel).filter(DefectStatusModel.id == defect.status_id).first()
    if not status_obj:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Указанный статус не найден"
        )
    
    # Создаем дефект
    db_defect = DefectModel(
        **defect.dict(),
        reporter_id=current_user.id
    )
    
    db.add(db_defect)
    db.commit()
    db.refresh(db_defect)
    return db_defect

@router.put("/{defect_id}", response_model=Defect)
async def update_defect(
    defect_id: int,
    defect_update: DefectUpdate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Обновить дефект"""
    defect = db.query(DefectModel).filter(DefectModel.id == defect_id).first()
    if not defect:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Дефект не найден"
        )
    
    # Проверяем права доступа
    can_edit = False
    if current_user.role.name in ["Менеджер", "Руководитель"]:
        can_edit = True
    elif current_user.role.name == "Инженер":
        if defect.reporter_id == current_user.id or defect.executor_id == current_user.id:
            can_edit = True
    
    if not can_edit:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Недостаточно прав для редактирования этого дефекта"
        )
    
    # Обновляем только переданные поля
    update_data = defect_update.dict(exclude_unset=True)
    
    # Проверяем существование исполнителя, если обновляется
    if "executor_id" in update_data and update_data["executor_id"]:
        executor = db.query(UserModel).filter(UserModel.id == update_data["executor_id"]).first()
        if not executor:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Указанный исполнитель не найден"
            )
    
    # Проверяем существование статуса, если обновляется
    if "status_id" in update_data:
        status_obj = db.query(DefectStatusModel).filter(DefectStatusModel.id == update_data["status_id"]).first()
        if not status_obj:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Указанный статус не найден"
            )
    
    # Применяем обновления
    for field, value in update_data.items():
        setattr(defect, field, value)
    
    defect.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(defect)
    return defect

@router.delete("/{defect_id}")
async def delete_defect(
    defect_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(require_role("Менеджер"))
):
    """Удалить дефект (только для менеджеров)"""
    defect = db.query(DefectModel).filter(DefectModel.id == defect_id).first()
    if not defect:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Дефект не найден"
        )
    
    db.delete(defect)
    db.commit()
    return {"message": "Дефект успешно удален"}

# Роуты для комментариев
@router.post("/{defect_id}/comments", response_model=DefectComment)
async def create_comment(
    defect_id: int,
    comment_data: DefectCommentCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Добавить комментарий к дефекту"""
    # Проверяем существование дефекта
    defect = db.query(DefectModel).filter(DefectModel.id == defect_id).first()
    if not defect:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Дефект не найден"
        )
    
    # Проверяем права доступа для инженеров
    if current_user.role.name == "Инженер":
        if defect.reporter_id != current_user.id and defect.executor_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Недостаточно прав для комментирования этого дефекта"
            )
    
    db_comment = DefectCommentModel(
        defect_id=defect_id,
        user_id=current_user.id,
        comment=comment_data.comment
    )
    
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

# Роуты для вложений
@router.post("/{defect_id}/attachments", response_model=DefectAttachment)
async def upload_attachment(
    defect_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Загрузить вложение к дефекту"""
    # Проверяем существование дефекта
    defect = db.query(DefectModel).filter(DefectModel.id == defect_id).first()
    if not defect:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Дефект не найден"
        )
    
    # Проверяем права доступа для инженеров
    if current_user.role.name == "Инженер":
        if defect.reporter_id != current_user.id and defect.executor_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Недостаточно прав для загрузки файлов к этому дефекту"
            )
    
    # Проверяем размер файла
    if file.size > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Размер файла превышает максимально допустимый ({settings.MAX_FILE_SIZE} байт)"
        )
    
    # Проверяем расширение файла
    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in settings.ALLOWED_FILE_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Недопустимое расширение файла. Разрешены: {', '.join(settings.ALLOWED_FILE_EXTENSIONS)}"
        )
    
    # Генерируем уникальное имя файла
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(settings.UPLOAD_DIRECTORY, unique_filename)
    
    # Сохраняем файл
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # Создаем запись в БД
    db_attachment = DefectAttachmentModel(
        defect_id=defect_id,
        file_path=file_path,
        original_name=file.filename
    )
    
    db.add(db_attachment)
    db.commit()
    db.refresh(db_attachment)
    return db_attachment
