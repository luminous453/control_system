from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, SmallInteger
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class DefectStatus(Base):
    __tablename__ = "defect_statuses"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False, index=True)
    
    # Отношения
    defects = relationship("Defect", back_populates="status")

class Defect(Base):
    __tablename__ = "defects"
    
    id = Column(Integer, primary_key=True, index=True)
    description = Column(Text, nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    reporter_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    executor_id = Column(Integer, ForeignKey("users.id"))
    status_id = Column(Integer, ForeignKey("defect_statuses.id"), nullable=False)
    priority = Column(SmallInteger, default=1)  # 1-низкий, 2-средний, 3-высокий
    deadline = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Отношения
    project = relationship("Project", back_populates="defects")
    reporter = relationship("User", foreign_keys=[reporter_id], back_populates="defects_reported")
    executor = relationship("User", foreign_keys=[executor_id], back_populates="defects_assigned")
    status = relationship("DefectStatus", back_populates="defects")
    comments = relationship("DefectComment", back_populates="defect", cascade="all, delete-orphan")
    attachments = relationship("DefectAttachment", back_populates="defect", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Defect(id={self.id}, description='{self.description[:50]}...')>"

class DefectComment(Base):
    __tablename__ = "defect_comments"
    
    id = Column(Integer, primary_key=True, index=True)
    defect_id = Column(Integer, ForeignKey("defects.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    comment = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Отношения
    defect = relationship("Defect", back_populates="comments")
    user = relationship("User", back_populates="comments")
    
    def __repr__(self):
        return f"<DefectComment(id={self.id}, defect_id={self.defect_id})>"

class DefectAttachment(Base):
    __tablename__ = "defect_attachments"
    
    id = Column(Integer, primary_key=True, index=True)
    defect_id = Column(Integer, ForeignKey("defects.id"), nullable=False)
    file_path = Column(String(500), nullable=False)
    original_name = Column(String(255), nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Отношения
    defect = relationship("Defect", back_populates="attachments")
    
    def __repr__(self):
        return f"<DefectAttachment(id={self.id}, original_name='{self.original_name}')>"
