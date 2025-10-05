#!/usr/bin/env python3

import sys
import os
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, create_tables
from app.models.users import User, Role
from app.models.projects import Project
from app.models.defects import Defect, DefectStatus, DefectComment
from app.utils.auth import get_password_hash

def seed_database():
    create_tables()
    db = SessionLocal()
    
    try:
        if db.query(Role).count() > 0:
            print("База данных уже содержит данные. Пропускаем инициализацию.")
            return
        
        print("Заполнение базы данных тестовыми данными...")
        roles_data = [
            {"name": "Инженер"},
            {"name": "Менеджер"},
            {"name": "Руководитель"}
        ]
        
        roles = {}
        for role_data in roles_data:
            role = Role(**role_data)
            db.add(role)
            db.flush()
            roles[role_data["name"]] = role
            print(f"Создана роль: {role.name}")
        
        statuses_data = [
            {"name": "Новая"},
            {"name": "В работе"},
            {"name": "На проверке"},
            {"name": "Закрыта"},
            {"name": "Отменена"}
        ]
        
        statuses = {}
        for status_data in statuses_data:
            status = DefectStatus(**status_data)
            db.add(status)
            db.flush()
            statuses[status_data["name"]] = status
            print(f"Создан статус: {status.name}")
        
        password_hash = get_password_hash("password123")
        
        users_data = [
            {
                "email": "admin@example.com",
                "password": password_hash,
                "full_name": "Администратор Системы",
                "role_id": roles["Менеджер"].id
            },
            {
                "email": "manager@example.com",
                "password": password_hash,
                "full_name": "Петров Иван Сергеевич",
                "role_id": roles["Менеджер"].id
            },
            {
                "email": "engineer1@example.com",
                "password": password_hash,
                "full_name": "Смирнов Алексей Викторович",
                "role_id": roles["Инженер"].id
            },
            {
                "email": "engineer2@example.com",
                "password": password_hash,
                "full_name": "Козлова Мария Андреевна",
                "role_id": roles["Инженер"].id
            },
            {
                "email": "supervisor@example.com",
                "password": password_hash,
                "full_name": "Директор Строительства",
                "role_id": roles["Руководитель"].id
            }
        ]
        
        users = {}
        for user_data in users_data:
            user = User(**user_data)
            db.add(user)
            db.flush()
            users[user_data["email"]] = user
            print(f"Создан пользователь: {user.full_name} ({user.email})")
        
        projects_data = [
            {
                "name": "ЖК \"Северный\"",
                "description": "Жилой комплекс на 500 квартир в северном районе города",
                "default_executor_id": users["engineer1@example.com"].id
            },
            {
                "name": "Торговый центр \"Мега\"",
                "description": "Строительство торгового центра площадью 25000 кв.м",
                "default_executor_id": users["engineer2@example.com"].id
            },
            {
                "name": "Офисное здание \"БизнесПарк\"",
                "description": "Современное офисное здание класса А",
                "default_executor_id": users["engineer1@example.com"].id
            },
            {
                "name": "Детский сад №45",
                "description": "Детский сад на 120 мест в микрорайоне",
                "default_executor_id": users["engineer2@example.com"].id
            }
        ]
        
        projects = []
        for project_data in projects_data:
            project = Project(**project_data)
            db.add(project)
            db.flush()
            projects.append(project)
            print(f"Создан проект: {project.name}")
        
        base_date = datetime.now() - timedelta(days=7)
        
        defects_data = [
            {
                "description": "Трещина в несущей стене на 5 этаже",
                "project_id": projects[0].id,
                "reporter_id": users["engineer1@example.com"].id,
                "executor_id": users["engineer1@example.com"].id,
                "status_id": statuses["В работе"].id,
                "priority": 3,
                "deadline": base_date + timedelta(days=10),
                "created_at": base_date,
                "updated_at": base_date + timedelta(days=2)
            },
            {
                "description": "Неровная стяжка пола в квартире 45",
                "project_id": projects[0].id,
                "reporter_id": users["engineer2@example.com"].id,
                "executor_id": users["engineer2@example.com"].id,
                "status_id": statuses["Новая"].id,
                "priority": 2,
                "deadline": base_date + timedelta(days=15),
                "created_at": base_date + timedelta(days=1),
                "updated_at": base_date + timedelta(days=1)
            },
            {
                "description": "Протечка кровли в секции А",
                "project_id": projects[0].id,
                "reporter_id": users["engineer1@example.com"].id,
                "executor_id": users["engineer1@example.com"].id,
                "status_id": statuses["На проверке"].id,
                "priority": 3,
                "deadline": base_date + timedelta(days=8),
                "created_at": base_date - timedelta(days=1),
                "updated_at": base_date + timedelta(days=3)
            },
            {
                "description": "Некачественная покраска стен",
                "project_id": projects[1].id,
                "reporter_id": users["engineer2@example.com"].id,
                "executor_id": users["engineer2@example.com"].id,
                "status_id": statuses["Закрыта"].id,
                "priority": 1,
                "deadline": base_date + timedelta(days=20),
                "created_at": base_date - timedelta(days=2),
                "updated_at": base_date + timedelta(days=4)
            },
            {
                "description": "Неправильная установка окон",
                "project_id": projects[1].id,
                "reporter_id": users["engineer1@example.com"].id,
                "executor_id": users["engineer1@example.com"].id,
                "status_id": statuses["В работе"].id,
                "priority": 2,
                "deadline": base_date + timedelta(days=12),
                "created_at": base_date + timedelta(days=2),
                "updated_at": base_date + timedelta(days=2)
            },
            {
                "description": "Дефект электропроводки в офисе 301",
                "project_id": projects[2].id,
                "reporter_id": users["engineer2@example.com"].id,
                "executor_id": users["engineer2@example.com"].id,
                "status_id": statuses["Новая"].id,
                "priority": 3,
                "deadline": base_date + timedelta(days=9),
                "created_at": base_date + timedelta(days=3),
                "updated_at": base_date + timedelta(days=3)
            },
            {
                "description": "Неровность пола в игровой комнате",
                "project_id": projects[3].id,
                "reporter_id": users["engineer1@example.com"].id,
                "executor_id": users["engineer1@example.com"].id,
                "status_id": statuses["В работе"].id,
                "priority": 2,
                "deadline": base_date + timedelta(days=11),
                "created_at": base_date + timedelta(days=1),
                "updated_at": base_date + timedelta(days=2)
            },
            {
                "description": "Проблемы с вентиляцией",
                "project_id": projects[3].id,
                "reporter_id": users["engineer2@example.com"].id,
                "executor_id": users["engineer2@example.com"].id,
                "status_id": statuses["Новая"].id,
                "priority": 1,
                "deadline": base_date + timedelta(days=25),
                "created_at": base_date + timedelta(days=4),
                "updated_at": base_date + timedelta(days=4)
            }
        ]
        
        defects = []
        for defect_data in defects_data:
            defect = Defect(**defect_data)
            db.add(defect)
            db.flush()
            defects.append(defect)
            print(f"Создан дефект: {defect.description[:50]}...")
        
        comments_data = [
            {
                "defect_id": defects[0].id,
                "user_id": users["manager@example.com"].id,
                "comment": "Требуется экстренное вмешательство строительной экспертизы",
                "created_at": base_date + timedelta(hours=2)
            },
            {
                "defect_id": defects[0].id,
                "user_id": users["engineer1@example.com"].id,
                "comment": "Трещина образовалась после усадки здания. Необходим ремонт",
                "created_at": base_date + timedelta(hours=6)
            },
            {
                "defect_id": defects[2].id,
                "user_id": users["manager@example.com"].id,
                "comment": "Протечка устранена, ожидаем проверки качества работ",
                "created_at": base_date + timedelta(days=3, hours=2)
            },
            {
                "defect_id": defects[3].id,
                "user_id": users["engineer2@example.com"].id,
                "comment": "Покраска выполнена повторно согласно техническим требованиям",
                "created_at": base_date + timedelta(days=4, hours=1)
            },
            {
                "defect_id": defects[4].id,
                "user_id": users["engineer1@example.com"].id,
                "comment": "Окна демонтированы, ожидается поставка новых",
                "created_at": base_date + timedelta(days=2, hours=1)
            },
            {
                "defect_id": defects[6].id,
                "user_id": users["manager@example.com"].id,
                "comment": "Назначен дополнительный контроль качества",
                "created_at": base_date + timedelta(days=2, hours=8)
            }
        ]
        
        for comment_data in comments_data:
            comment = DefectComment(**comment_data)
            db.add(comment)
            print(f"Создан комментарий к дефекту #{comment_data['defect_id']}")
        
        db.commit()
        print("\nБаза данных успешно заполнена тестовыми данными!")
        print("\nТестовые пользователи (пароль: password123):")
        print("- admin@example.com (Менеджер)")
        print("- manager@example.com (Менеджер)")
        print("- engineer1@example.com (Инженер)")
        print("- engineer2@example.com (Инженер)")
        print("- supervisor@example.com (Руководитель)")
        
    except Exception as e:
        print(f"Ошибка при заполнении базы данных: {e}")
        db.rollback()
        raise
    
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
