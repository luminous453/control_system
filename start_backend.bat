@echo off
echo Запуск Backend системы управления дефектами...
echo.

cd backend

echo Проверка зависимостей...
pip install -r requirements.txt

echo.
echo Инициализация базы данных тестовыми данными...
python seed_db.py

echo.
echo Запуск FastAPI сервера...
echo API будет доступно по адресу: http://localhost:8000
echo Документация API: http://localhost:8000/docs
echo.

uvicorn main:app --reload --host 0.0.0.0 --port 8000
