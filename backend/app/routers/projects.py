from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from ..schemas.projects import Project, ProjectCreate, ProjectUpdate, ProjectWithDefects
from ..models.projects import Project as ProjectModel
from ..models.defects import Defect as DefectModel
from ..models.users import User as UserModel
from ..utils.auth import get_current_active_user, require_role

router = APIRouter()

@router.get("/", response_model=List[ProjectWithDefects])
async def get_projects(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить список проектов с количеством дефектов"""
    projects_query = db.query(
        ProjectModel,
        func.count(DefectModel.id).label("defects_count")
    ).outerjoin(DefectModel).group_by(ProjectModel.id).offset(skip).limit(limit)
    
    projects_with_counts = projects_query.all()
    
    result = []
    for project, defects_count in projects_with_counts:
        project_dict = {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "default_executor_id": project.default_executor_id,
            "created_at": project.created_at,
            "defects_count": defects_count or 0
        }
        result.append(project_dict)
    
    return result

@router.get("/{project_id}", response_model=Project)
async def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить проект по ID"""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Проект не найден"
        )
    return project

@router.post("/", response_model=Project)
async def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(require_role("Менеджер"))
):
    """Создать новый проект (только для менеджеров)"""
    # Проверяем существование исполнителя по умолчанию, если указан
    if project.default_executor_id:
        executor = db.query(UserModel).filter(UserModel.id == project.default_executor_id).first()
        if not executor:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Указанный исполнитель не найден"
            )
    
    db_project = ProjectModel(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.put("/{project_id}", response_model=Project)
async def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(require_role("Менеджер"))
):
    """Обновить проект (только для менеджеров)"""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Проект не найден"
        )
    
    # Обновляем только переданные поля
    update_data = project_update.dict(exclude_unset=True)
    
    # Проверяем существование исполнителя по умолчанию, если обновляется
    if "default_executor_id" in update_data and update_data["default_executor_id"]:
        executor = db.query(UserModel).filter(UserModel.id == update_data["default_executor_id"]).first()
        if not executor:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Указанный исполнитель не найден"
            )
    
    # Применяем обновления
    for field, value in update_data.items():
        setattr(project, field, value)
    
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{project_id}")
async def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(require_role("Менеджер"))
):
    """Удалить проект (только для менеджеров)"""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Проект не найден"
        )
    
    # Проверяем, есть ли связанные дефекты
    defects_count = db.query(DefectModel).filter(DefectModel.project_id == project_id).count()
    if defects_count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Невозможно удалить проект. С ним связано {defects_count} дефектов."
        )
    
    db.delete(project)
    db.commit()
    return {"message": "Проект успешно удален"}
