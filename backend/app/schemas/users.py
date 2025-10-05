from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# Схемы для ролей
class RoleBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)

class RoleCreate(RoleBase):
    pass

class Role(RoleBase):
    id: int
    
    class Config:
        from_attributes = True

# Схемы для пользователей
class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=1, max_length=255)
    role_id: int

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=100)

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = Field(None, min_length=1, max_length=255)
    role_id: Optional[int] = None
    password: Optional[str] = Field(None, min_length=8, max_length=100)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    role: Role
    
    class Config:
        from_attributes = True

class UserInDB(User):
    password: str

# Схема для токена аутентификации
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

class TokenData(BaseModel):
    email: Optional[str] = None
