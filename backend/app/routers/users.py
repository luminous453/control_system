from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas.users import User, UserCreate, UserUpdate, Role, RoleCreate
from ..models.users import User as UserModel, Role as RoleModel
from ..utils.auth import get_current_active_user, require_role, get_password_hash

router = APIRouter()

# Роуты для ролей
@router.get("/roles", response_model=List[Role])
async def get_roles(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить список всех ролей"""
    roles = db.query(RoleModel).all()
    return roles

@router.post("/roles", response_model=Role)
async def create_role(
    role: RoleCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(require_role("Менеджер"))
):
    """Создать новую роль (только для менеджеров)"""
    # Проверяем, существует ли роль с таким именем
    existing_role = db.query(RoleModel).filter(RoleModel.name == role.name).first()
    if existing_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Роль с таким именем уже существует"
        )
    
    db_role = RoleModel(name=role.name)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role

# Роуты для пользователей
@router.get("/", response_model=List[User])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить список пользователей"""
    users = db.query(UserModel).offset(skip).limit(limit).all()
    return users

@router.get("/me", response_model=User)
async def get_current_user_info(
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить информацию о текущем пользователе"""
    return current_user

@router.get("/{user_id}", response_model=User)
async def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Получить пользователя по ID"""
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден"
        )
    return user

@router.put("/{user_id}", response_model=User)
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """Обновить пользователя"""
    # Проверяем права доступа
    if current_user.id != user_id and current_user.role.name not in ["Менеджер", "Руководитель"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Недостаточно прав для редактирования этого пользователя"
        )
    
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден"
        )
    
    # Обновляем только переданные поля
    update_data = user_update.dict(exclude_unset=True)
    
    if "email" in update_data:
        # Проверяем уникальность email
        existing_user = db.query(UserModel).filter(
            UserModel.email == update_data["email"],
            UserModel.id != user_id
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Пользователь с таким email уже существует"
            )
    
    if "password" in update_data:
        # Хешируем новый пароль
        update_data["password"] = get_password_hash(update_data["password"])
    
    if "role_id" in update_data:
        # Проверяем существование роли
        role = db.query(RoleModel).filter(RoleModel.id == update_data["role_id"]).first()
        if not role:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Указанная роль не существует"
            )
    
    # Применяем обновления
    for field, value in update_data.items():
        setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(require_role("Менеджер"))
):
    """Удалить пользователя (только для менеджеров)"""
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден"
        )
    
    # Нельзя удалить самого себя
    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Нельзя удалить самого себя"
        )
    
    db.delete(user)
    db.commit()
    return {"message": "Пользователь успешно удален"}
