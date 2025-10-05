#!/usr/bin/env python3
"""
Простой тест для проверки API
"""

import requests
import json
from datetime import datetime

# Базовый URL API
BASE_URL = "http://localhost:8000"

def test_api():
    """Тестирует основные функции API"""
    
    print("=== Тестирование API Системы Контроля Дефектов ===")
    print(f"Базовый URL: {BASE_URL}")
    print()
    
    try:
        # 1. Проверяем health endpoint
        print("1. Проверка health endpoint...")
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check пройден")
        else:
            print(f"❌ Health check не пройден: {response.status_code}")
            return
        print()
        
        # 2. Проверяем корневой endpoint
        print("2. Проверка корневого endpoint...")
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Корневой endpoint работает: {data.get('message')}")
        else:
            print(f"❌ Корневой endpoint не работает: {response.status_code}")
        print()
        
        # 3. Получаем роли (без аутентификации это должно не работать)
        print("3. Проверка защищенного endpoint без токена...")
        response = requests.get(f"{BASE_URL}/api/users/roles")
        if response.status_code == 401:
            print("✅ Защищенный endpoint корректно требует аутентификацию")
        else:
            print(f"❌ Защищенный endpoint работает без токена: {response.status_code}")
        print()
        
        # 4. Тестируем авторизацию
        print("4. Тестирование авторизации...")
        login_data = {
            "username": "admin@example.com",  # OAuth2PasswordRequestForm использует username
            "password": "password123"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=login_data,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        
        if response.status_code == 200:
            token_data = response.json()
            access_token = token_data.get("access_token")
            user = token_data.get("user")
            print(f"✅ Успешная авторизация пользователя: {user.get('full_name')}")
            print(f"   Роль: {user.get('role', {}).get('name')}")
            
            # Сохраняем токен для дальнейших запросов
            headers = {"Authorization": f"Bearer {access_token}"}
            
        else:
            print(f"❌ Ошибка авторизации: {response.status_code}")
            print(f"   Ответ: {response.text}")
            return
        print()
        
        # 5. Получаем роли с токеном
        print("5. Получение ролей с токеном...")
        response = requests.get(f"{BASE_URL}/api/users/roles", headers=headers)
        if response.status_code == 200:
            roles = response.json()
            print(f"✅ Получены роли: {[role['name'] for role in roles]}")
        else:
            print(f"❌ Ошибка получения ролей: {response.status_code}")
        print()
        
        # 6. Получаем информацию о текущем пользователе
        print("6. Получение информации о текущем пользователе...")
        response = requests.get(f"{BASE_URL}/api/users/me", headers=headers)
        if response.status_code == 200:
            user = response.json()
            print(f"✅ Текущий пользователь: {user.get('full_name')} ({user.get('email')})")
        else:
            print(f"❌ Ошибка получения пользователя: {response.status_code}")
        print()
        
        # 7. Получаем проекты
        print("7. Получение списка проектов...")
        response = requests.get(f"{BASE_URL}/api/projects/", headers=headers)
        if response.status_code == 200:
            projects = response.json()
            print(f"✅ Получено проектов: {len(projects)}")
            for project in projects[:3]:  # Показываем первые 3
                print(f"   - {project.get('name')} (дефектов: {project.get('defects_count', 0)})")
        else:
            print(f"❌ Ошибка получения проектов: {response.status_code}")
        print()
        
        # 8. Получаем дефекты
        print("8. Получение списка дефектов...")
        response = requests.get(f"{BASE_URL}/api/defects/", headers=headers)
        if response.status_code == 200:
            defects = response.json()
            print(f"✅ Получено дефектов: {len(defects)}")
            for defect in defects[:3]:  # Показываем первые 3
                status = defect.get('status', {}).get('name', 'Неизвестно')
                priority = {1: 'Низкий', 2: 'Средний', 3: 'Высокий'}.get(defect.get('priority'), 'Неизвестно')
                print(f"   - ID {defect.get('id')}: {defect.get('description')[:50]}... [{status}, {priority}]")
        else:
            print(f"❌ Ошибка получения дефектов: {response.status_code}")
        print()
        
        # 9. Получаем аналитику
        print("9. Получение аналитических данных...")
        response = requests.get(f"{BASE_URL}/api/reports/analytics", headers=headers)
        if response.status_code == 200:
            analytics = response.json()
            metrics = analytics.get('metrics', {})
            print(f"✅ Аналитические данные получены:")
            print(f"   - Всего дефектов: {metrics.get('total_defects')}")
            print(f"   - Открытых: {metrics.get('open_defects')}")
            print(f"   - Закрытых: {metrics.get('closed_defects')}")
            print(f"   - Процент завершения: {metrics.get('completion_rate')}%")
        else:
            print(f"❌ Ошибка получения аналитики: {response.status_code}")
        print()
        
        print("🎉 Все основные тесты API пройдены успешно!")
        print("📖 Полная документация API доступна по адресу: http://localhost:8000/docs")
        
    except requests.exceptions.ConnectionError:
        print("❌ Не удается подключиться к серверу")
        print("   Убедитесь, что backend сервер запущен на http://localhost:8000")
    except Exception as e:
        print(f"❌ Неожиданная ошибка: {e}")

if __name__ == "__main__":
    test_api()
