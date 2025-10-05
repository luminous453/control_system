# Система Контроля Дефектов - Backend

FastAPI backend для системы управления дефектами на строительных объектах.

## Технологический стек

- **FastAPI** - веб-фреймворк
- **SQLAlchemy** - ORM для работы с базой данных
- **PostgreSQL** - база данных
- **JWT** - аутентификация
- **Pydantic** - валидация данных
- **Uvicorn** - ASGI сервер

## Структура проекта

```
backend/
├── app/
│   ├── models/          # Модели SQLAlchemy
│   ├── schemas/         # Pydantic схемы
│   ├── routers/         # API роутеры
│   ├── utils/           # Утилиты (аутентификация)
│   ├── config.py        # Конфигурация
│   └── database.py      # Подключение к БД
├── init_db/             # SQL скрипты инициализации
├── uploads/             # Загруженные файлы
├── requirements.txt     # Python зависимости
├── Dockerfile          # Docker конфигурация
├── seed_db.py          # Заполнение БД тестовыми данными
└── main.py             # Точка входа приложения
```

## Установка и запуск

### Вариант 1: Локальный запуск

1. Создайте виртуальное окружение:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Настройте переменные окружения:
```bash
cp .env.example .env
# Отредактируйте .env файл под ваши настройки
```

4. Запустите PostgreSQL и создайте базу данных `control_system`

5. Заполните базу данных тестовыми данными:
```bash
python seed_db.py
```

6. Запустите сервер:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Вариант 2: Docker

Из корневой директории проекта:

```bash
docker-compose up -d
```

## API Документация

После запуска сервера доступна документация:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Роли пользователей

### Инженер
- Создание и редактирование своих дефектов
- Добавление комментариев к назначенным дефектам
- Загрузка файлов к дефектам
- Просмотр только своих дефектов

### Менеджер
- Все права инженера
- Управление пользователями
- Управление проектами
- Назначение исполнителей
- Изменение статусов дефектов
- Просмотр всех дефектов
- Экспорт отчетов

### Руководитель
- Просмотр аналитики и отчетности
- Просмотр всех дефектов
- Экспорт отчетов

## Тестовые пользователи

После выполнения `seed_db.py` будут созданы следующие пользователи (пароль: `password123`):

- `admin@example.com` - Администратор (Менеджер)
- `manager@example.com` - Менеджер
- `engineer1@example.com` - Инженер
- `engineer2@example.com` - Инженер  
- `supervisor@example.com` - Руководитель

## API Endpoints

### Аутентификация
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/register` - Регистрация

### Пользователи
- `GET /api/users/` - Список пользователей
- `GET /api/users/me` - Текущий пользователь
- `GET /api/users/{id}` - Пользователь по ID
- `PUT /api/users/{id}` - Обновление пользователя
- `DELETE /api/users/{id}` - Удаление пользователя

### Проекты
- `GET /api/projects/` - Список проектов
- `POST /api/projects/` - Создание проекта
- `GET /api/projects/{id}` - Проект по ID
- `PUT /api/projects/{id}` - Обновление проекта
- `DELETE /api/projects/{id}` - Удаление проекта

### Дефекты
- `GET /api/defects/` - Список дефектов (с фильтрацией)
- `POST /api/defects/` - Создание дефекта
- `GET /api/defects/{id}` - Дефект по ID
- `PUT /api/defects/{id}` - Обновление дефекта
- `DELETE /api/defects/{id}` - Удаление дефекта
- `POST /api/defects/{id}/comments` - Добавление комментария
- `POST /api/defects/{id}/attachments` - Загрузка файла

### Отчеты
- `GET /api/reports/analytics` - Аналитические данные
- `GET /api/reports/defects-by-executor` - Статистика по исполнителям
- `GET /api/reports/export/csv` - Экспорт в CSV

## Безопасность

- Пароли хешируются с использованием bcrypt
- JWT токены для аутентификации
- Разграничение доступа по ролям
- Валидация входных данных
- Защита от основных уязвимостей

## Разработка

Для разработки используйте:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Режим `--reload` автоматически перезапускает сервер при изменении кода.
