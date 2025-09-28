# ООО «СистемаКонтроля» по работе с строительными объектами

---

### Технологии
> [![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white)](https://code.visualstudio.com/)
> [![WebStorm](https://img.shields.io/badge/WebStorm-000?logo=webstorm&logoColor=fff)](https://www.jetbrains.com/webstorm/)
> [![PyCharm](https://img.shields.io/badge/PyCharm-000?logo=pycharm&logoColor=fff)](https://www.jetbrains.com/pycharm/)
> <br/>Backend:
> [![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=fff)](https://www.python.org/)
> [![FastAPI](https://img.shields.io/badge/FastAPI-009485.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
> [![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-%23D71F00.svg?logo=sqlalchemy&logoColor=white)](https://fastapi.tiangolo.com/)
[![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
> <br/> Frontend:
> [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
> [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
> [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
<br/>Architecture: [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](https://www.docker.com/)

---

## Анализ требований технического задания
В техническом задании сказано, что необходимо создать веб-приложение для управления дефектами на строительных объектах. Пользователями будут инженеры, менеджеры, руководители (заказчики).
### Функциональные требования, представленные в техническом задании
1.	Регистрация пользователей и аутентификация.
2.	Разграничение прав доступа (менеджер, инженер, наблюдатель).
3.	Управление проектами/объектами и их этапами.
4.	Создание и редактирование дефектов (заголовок, описание, приоритет, исполнитель, сроки, вложения).
5.	Управление статусами дефектов: Новая → В работе → На проверке → Закрыта/Отменена.
6.	Ведение комментариев и истории изменений.
7.	Поиск, сортировка и фильтрация дефектов.
8.	Экспорт отчётности в CSV/Excel.
9.	Просмотр аналитических отчётов (графики, статистика).
### Нефункциональные требования, представленные в техническом задании
1.	Время отклика страницы ≤ 1 секунды (для 50 активных пользователей).
2.	Обеспечить резервное копирование БД раз в сутки.
3.	Интерфейс на русском языке, адаптивный под ПК/планшеты.
4.	Совместимость с Chrome/Firefox/Edge последних версий.
5.	Пароли хранить с использованием bcrypt или argon2.
6.	Защита от SQL-инъекций, XSS и CSRF.

---

## Роли пользователей
> ### Инженер
   Роль инженера – основной исполнитель. Инженер регистрирует дефекты, вносит информацию, добавляет комментарии и приложенные файлы. Инженер может редактировать внесенную информацию. 
> ### Менеджер
   Менеджер исполняет роль координатора. Он управляет назначением, контролирует сроки и формирует отчетность для руководителей. Менеджер управляет сменой статуса работы с дефектами. Статусы дефектов: новая, в работе, на проверке, закрыта или отменена.
> ### Руководитель (заказчик)
   Руководитель – это лицо, которое осуществляет мониторинг и анализ устранения дефектов. Доступен просмотр аналитической отчетности.

---

## Архитектура монолитного приложения и технологический стек
Приложение с клиент-серверной архитектурой. Next.js отвечает за frontend и SSR, FastAPI – за backend API, Nginx выступает как reverse proxy и сервер статики.
### Технологический стек
- Backend: FastAPI
- ORM: SQLAlchemy
- Хранение всех данных: PostgreSQL
- Frontend: Next.js 14+, TypeScript
- Инфраструктура: Docker, Docker Compose
- Web Server: Nginx
- Аутентификация: JWT-токены

### Архитектура проекта
![architecture](./images/architecture.png)
### ER-диаграмма
![erd](./images/erd.png)
### UseCase диаграмма
![usecase](./images/usecase.png)

