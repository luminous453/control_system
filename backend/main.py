from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from dotenv import load_dotenv
import os

from app.database import create_tables
from app.routers import auth, users, projects, defects, reports

# Загружаем переменные окружения
load_dotenv()

app = FastAPI(
    title="Система Контроля Дефектов",
    description="API для управления дефектами на строительных объектах",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Настройка CORS для фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Trusted Host middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "0.0.0.0"]
)

# Подключаем роутеры
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(defects.router, prefix="/api/defects", tags=["Defects"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])

@app.on_event("startup")
async def startup_event():
    """Создание таблиц при запуске приложения"""
    create_tables()

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Система Контроля Дефектов API запущена"}

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "healthy", "message": "API работает корректно"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
