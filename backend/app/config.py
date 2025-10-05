from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/control_system"
    DATABASE_HOST: str = "localhost"
    DATABASE_PORT: int = 5432
    DATABASE_NAME: str = "control_system"
    DATABASE_USER: str = "postgres"
    DATABASE_PASSWORD: str = "password"
    
    # JWT settings
    SECRET_KEY: str = "your-secret-key-here-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Security settings
    PASSWORD_MIN_LENGTH: int = 8
    
    # CORS settings
    ALLOWED_ORIGINS: list = ["http://localhost:3000", "http://localhost:8000"]
    
    # File upload settings
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_DIRECTORY: str = "uploads"
    ALLOWED_FILE_EXTENSIONS: set = {".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx", ".txt"}
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Создаем глобальный экземпляр настроек
settings = Settings()

# Создаем директорию для загрузок если она не существует
os.makedirs(settings.UPLOAD_DIRECTORY, exist_ok=True)
