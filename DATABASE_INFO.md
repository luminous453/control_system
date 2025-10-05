# База данных

## Расположение базы данных

База данных PostgreSQL с именем `control_system` на локальном сервере:
```
Host: localhost
Port: 5432
Database: control_system
User: postgres
Password: password
```

## Тип базы данных

Используется PostgreSQL - реляционная база данных. Требует установки PostgreSQL сервера.

## Создание и инициализация

1. Сначала создайте базу данных в PostgreSQL:
   ```sql
   CREATE DATABASE control_system;
   ```

2. При запуске backend автоматически:
   - Создаются все таблицы согласно SQLAlchemy моделям
   - Заполняется тестовыми данными через `seed_db.py`

3. Структура таблиц:
   - `roles` - роли пользователей
   - `users` - пользователи
   - `projects` - проекты
   - `defect_statuses` - статусы дефектов
   - `defects` - дефекты
   - `defect_comments` - комментарии к дефектам
   - `defect_attachments` - файловые вложения

## Тестовые данные

После инициализации база содержит:
- 3 роли (Инженер, Менеджер, Руководитель)
- 5 статусов дефектов
- 5 пользователей с паролем `password123`
- 4 тестовых проекта
- 8 дефектов с комментариями

## Сброс базы данных

Для полного сброса выполните в PostgreSQL:
```sql
DROP DATABASE control_system;
CREATE DATABASE control_system;
```
Затем перезапустите backend.
