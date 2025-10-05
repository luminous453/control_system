from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from .users import User
from .projects import Project

# Схемы для статусов дефектов
class DefectStatusBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)

class DefectStatusCreate(DefectStatusBase):
    pass

class DefectStatus(DefectStatusBase):
    id: int
    
    class Config:
        from_attributes = True

# Схемы для комментариев
class DefectCommentBase(BaseModel):
    comment: str = Field(..., min_length=1)

class DefectCommentCreate(DefectCommentBase):
    defect_id: int

class DefectComment(DefectCommentBase):
    id: int
    defect_id: int
    user_id: int
    created_at: datetime
    user: User
    
    class Config:
        from_attributes = True

# Схемы для вложений
class DefectAttachmentBase(BaseModel):
    original_name: str = Field(..., min_length=1, max_length=255)

class DefectAttachment(DefectAttachmentBase):
    id: int
    defect_id: int
    file_path: str
    uploaded_at: datetime
    
    class Config:
        from_attributes = True

# Схемы для дефектов
class DefectBase(BaseModel):
    description: str = Field(..., min_length=1)
    project_id: int
    executor_id: Optional[int] = None
    status_id: int = 1  # По умолчанию статус "Новая"
    priority: int = Field(default=1, ge=1, le=3)  # 1-низкий, 2-средний, 3-высокий
    deadline: Optional[datetime] = None

class DefectCreate(DefectBase):
    pass

class DefectUpdate(BaseModel):
    description: Optional[str] = Field(None, min_length=1)
    executor_id: Optional[int] = None
    status_id: Optional[int] = None
    priority: Optional[int] = Field(None, ge=1, le=3)
    deadline: Optional[datetime] = None

class Defect(DefectBase):
    id: int
    reporter_id: int
    created_at: datetime
    updated_at: datetime
    
    # Связанные объекты
    project: Project
    reporter: User
    executor: Optional[User] = None
    status: DefectStatus
    
    class Config:
        from_attributes = True

class DefectWithDetails(Defect):
    comments: List[DefectComment] = []
    attachments: List[DefectAttachment] = []

# Схемы для фильтрации и поиска
class DefectFilter(BaseModel):
    project_id: Optional[int] = None
    status_id: Optional[int] = None
    priority: Optional[int] = None
    executor_id: Optional[int] = None
    reporter_id: Optional[int] = None
    search: Optional[str] = None  # Поиск по описанию
    skip: int = Field(default=0, ge=0)
    limit: int = Field(default=50, ge=1, le=100)
