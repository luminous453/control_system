from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Создаем движок базы данных
engine = create_engine(
    settings.DATABASE_URL,
    echo=True  # Для отладки - показывает SQL запросы в консоли
)

# Создаем фабрику сессий
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей
Base = declarative_base()

def get_db():
    """Dependency для получения сессии базы данных"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Создает все таблицы в базе данных"""
    from .models import users, projects, defects  # Импортируем модели
    Base.metadata.create_all(bind=engine)
