# Быстрый запуск системы

## 1. Настройка базы данных

### Создайте базу данных PostgreSQL:
```sql
CREATE DATABASE control_system;
```

### Выполните SQL скрипт для создания таблиц:
```bash
# Windows
setup_database.bat

# Или вручную
psql -h localhost -U postgres -d control_system -f manual_setup.sql
```

## 2. Запуск Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend будет доступен на: http://localhost:8000

## 3. Запуск Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен на: http://localhost:3000

## Тестовые аккаунты

| Email | Пароль | Роль |
|-------|--------|------|
| engineer1@example.com | password123 | Инженер |
| manager1@example.com | password123 | Менеджер |
| director@example.com | password123 | Руководитель |

## API Documentation

После запуска backend перейдите на: http://localhost:8000/docs

Готово! Система полностью настроена и готова к использованию.
