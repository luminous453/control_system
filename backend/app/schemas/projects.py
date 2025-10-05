from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ProjectBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    default_executor_id: Optional[int] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    default_executor_id: Optional[int] = None

class Project(ProjectBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProjectWithDefects(Project):
    defects_count: int = 0
