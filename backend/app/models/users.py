from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Role(Base):
    __tablename__ = "roles"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False, index=True)
    
    # Отношения
    users = relationship("User", back_populates="role")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)  # Будет хранить хеш пароля
    full_name = Column(String(255), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Отношения
    role = relationship("Role", back_populates="users")
    defects_reported = relationship("Defect", foreign_keys="Defect.reporter_id", back_populates="reporter")
    defects_assigned = relationship("Defect", foreign_keys="Defect.executor_id", back_populates="executor")
    comments = relationship("DefectComment", back_populates="user")
    
    def __repr__(self):
        return f"<User(email='{self.email}', full_name='{self.full_name}')>"
