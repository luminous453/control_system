'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EngineerDashboard() {
  const [userName] = useState('Смирнов Алексей Викторович');

  // Заглушки данных для инженера
  const engineerStats = {
    myDefects: 12,
    assignedToMe: 8,
    completedThisMonth: 15,
    pendingReview: 3
  };

  const myRecentDefects = [
    { 
      id: 1, 
      title: 'Трещина в стене на 5 этаже', 
      status: 'В работе', 
      priority: 'Высокий', 
      project: 'ЖК Солнечный',
      deadline: '2024-01-20'
    },
    { 
      id: 2, 
      title: 'Неровность пола в квартире 45', 
      status: 'Новая', 
      priority: 'Средний', 
      project: 'ЖК Солнечный',
      deadline: '2024-01-25'
    },
    { 
      id: 3, 
      title: 'Дефект электропроводки', 
      status: 'На проверке', 
      priority: 'Высокий', 
      project: 'Офис Центр',
      deadline: '2024-01-18'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новая': return { bg: '#66A5AD', text: 'white' };
      case 'В работе': return { bg: '#07575B', text: 'white' };
      case 'На проверке': return { bg: '#003B46', text: 'white' };
      case 'Закрыта': return { bg: '#C4DFE6', text: '#003B46' };
      default: return { bg: '#C4DFE6', text: '#07575B' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Высокий': return { bg: '#FF8800', text: 'white' };
      case 'Средний': return { bg: '#66A5AD', text: 'white' };
      case 'Низкий': return { bg: '#C4DFE6', text: '#003B46' };
      default: return { bg: '#C4DFE6', text: '#07575B' };
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#C4DFE6'}}>
      {/* Заголовок */}
      <div className="shadow" style={{backgroundColor: '#66A5AD'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#003B46'}}>Рабочее место инженера</h1>
              <p style={{color: '#07575B'}}>
                Добро пожаловать, {userName}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/defects/create"
                className="text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#07575B'}}
              >
                Зарегистрировать дефект
              </Link>
              <Link 
                href="/auth/login"
                className="px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#C4DFE6', color: '#003B46'}}
              >
                Выход
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Статистика инженера */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded" style={{backgroundColor: '#66A5AD'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium" style={{color: '#07575B'}}>Мои дефекты</p>
                <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{engineerStats.myDefects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded" style={{backgroundColor: '#07575B'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium" style={{color: '#07575B'}}>Назначено мне</p>
                <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{engineerStats.assignedToMe}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded" style={{backgroundColor: '#003B46'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium" style={{color: '#07575B'}}>Выполнено за месяц</p>
                <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{engineerStats.completedThisMonth}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded" style={{backgroundColor: '#C4DFE6'}}>
                <div className="w-6 h-6 rounded" style={{backgroundColor: '#003B46'}}></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium" style={{color: '#07575B'}}>На проверке</p>
                <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{engineerStats.pendingReview}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Быстрые действия для инженера */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>
                Основные действия
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <Link
                  href="/defects/create"
                  className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  style={{backgroundColor: '#66A5AD'}}
                >
                  <h3 className="font-medium text-lg mb-1">Зарегистрировать дефект</h3>
                  <p className="text-sm opacity-90">Создать новую запись о выявленном дефекте</p>
                </Link>

                <Link
                  href="/defects?assigned_to_me=true"
                  className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  style={{backgroundColor: '#07575B'}}
                >
                  <h3 className="font-medium text-lg mb-1">Мои назначенные дефекты</h3>
                  <p className="text-sm opacity-90">Просмотр и работа с назначенными мне дефектами</p>
                </Link>

                <Link
                  href="/defects?reporter_id=me"
                  className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  style={{backgroundColor: '#003B46'}}
                >
                  <h3 className="font-medium text-lg mb-1">Мои зарегистрированные дефекты</h3>
                  <p className="text-sm opacity-90">Дефекты, которые я зарегистрировал</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Мои последние дефекты */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>Последние дефекты</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {myRecentDefects.map((defect) => (
                  <div key={defect.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">{defect.title}</h3>
                      <span 
                        className="px-2 py-1 text-xs font-semibold rounded-full"
                        style={{
                          backgroundColor: getStatusColor(defect.status).bg,
                          color: getStatusColor(defect.status).text
                        }}
                      >
                        {defect.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                      <span>{defect.project}</span>
                      <span 
                        className="px-2 py-1 font-semibold rounded-full"
                        style={{
                          backgroundColor: getPriorityColor(defect.priority).bg,
                          color: getPriorityColor(defect.priority).text
                        }}
                      >
                        {defect.priority}
                      </span>
                    </div>
                    <div className="text-xs" style={{color: '#07575B'}}>
                      Срок: {new Date(defect.deadline).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link 
                  href="/defects" 
                  className="text-sm font-medium hover:opacity-80"
                  style={{color: '#07575B'}}
                >
                  Посмотреть все дефекты →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Полезные ссылки */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>Полезные ссылки</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/projects" 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                style={{borderColor: '#66A5AD'}}
              >
                <h3 className="font-medium mb-2" style={{color: '#003B46'}}>Проекты</h3>
                <p className="text-sm" style={{color: '#07575B'}}>Просмотр активных проектов</p>
              </Link>

              <Link 
                href="/defects?status=new" 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                style={{borderColor: '#66A5AD'}}
              >
                <h3 className="font-medium mb-2" style={{color: '#003B46'}}>Новые дефекты</h3>
                <p className="text-sm" style={{color: '#07575B'}}>Недавно зарегистрированные дефекты</p>
              </Link>

              <div 
                className="p-4 border rounded-lg opacity-60"
                style={{borderColor: '#C4DFE6'}}
              >
                <h3 className="font-medium mb-2" style={{color: '#07575B'}}>Документация</h3>
                <p className="text-sm" style={{color: '#07575B'}}>Руководства и инструкции</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
