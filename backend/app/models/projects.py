from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    default_executor_id = Column(Integer, ForeignKey("users.id"))  # Исполнитель по умолчанию
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Отношения
    default_executor = relationship("User", foreign_keys=[default_executor_id])
    defects = relationship("Defect", back_populates="project")
    
    def __repr__(self):
        return f"<Project(name='{self.name}')>"
