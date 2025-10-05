'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [userRole] = useState<'engineer' | 'manager' | 'supervisor'>('manager');
  const [userName] = useState('Иван Петров');
  React.useEffect(() => {
    const timer = setTimeout(() => {
      switch (userRole) {
        case 'engineer':
          window.location.href = '/dashboard/engineer';
          break;
        case 'manager':
          window.location.href = '/dashboard/manager';
          break;
        case 'supervisor':
          window.location.href = '/dashboard/supervisor';
          break;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [userRole]);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'engineer': return 'Инженер';
      case 'manager': return 'Менеджер';
      case 'observer': return 'Руководитель';
      default: return 'Пользователь';
    }
  };

  // Заглушки данных для дашборда
  const stats = {
    totalDefects: 45,
    newDefects: 8,
    inProgressDefects: 22,
    completedDefects: 15,
    activeProjects: 5
  };

  const recentDefects = [
    { id: 1, title: 'Трещина в стене', status: 'Новая', priority: 'Высокий', project: 'ЖК Солнечный' },
    { id: 2, title: 'Неровность пола', status: 'В работе', priority: 'Средний', project: 'Офис Центр' },
    { id: 3, title: 'Протечка крыши', status: 'На проверке', priority: 'Критический', project: 'Торговый центр' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новая': return { bg: '#66A5AD', text: 'white', border: '#07575B' };
      case 'В работе': return { bg: '#07575B', text: 'white', border: '#003B46' };
      case 'На проверке': return { bg: '#003B46', text: 'white', border: '#003B46' };
      case 'Закрыта': return { bg: '#C4DFE6', text: '#003B46', border: '#66A5AD' };
      default: return { bg: '#C4DFE6', text: '#07575B', border: '#66A5AD' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Критический': return { bg: '#FF4444', text: 'white', border: '#CC0000' };
      case 'Высокий': return { bg: '#FF8800', text: 'white', border: '#DD6600' };
      case 'Средний': return { bg: '#66A5AD', text: 'white', border: '#07575B' };
      case 'Низкий': return { bg: '#C4DFE6', text: '#003B46', border: '#66A5AD' };
      default: return { bg: '#C4DFE6', text: '#07575B', border: '#66A5AD' };
    }
  };

  const getRoleSpecificActions = () => {
    switch (userRole) {
      case 'engineer':
        return [
          { href: '/defects', title: 'Мои дефекты', description: 'Просмотр назначенных мне дефектов', bgColor: '#66A5AD' },
          { href: '/defects/create', title: 'Зарегистрировать дефект', description: 'Создать новую запись о дефекте', bgColor: '#07575B' }
        ];
      case 'manager':
        return [
          { href: '/defects', title: 'Управление дефектами', description: 'Назначение и контроль дефектов', bgColor: '#66A5AD' },
          { href: '/projects', title: 'Проекты', description: 'Управление строительными проектами', bgColor: '#07575B' },
          { href: '/reports', title: 'Отчеты', description: 'Формирование отчетности', bgColor: '#003B46' }
        ];
      case 'observer':
        return [
          { href: '/analytics', title: 'Аналитика', description: 'Просмотр аналитических данных', bgColor: '#66A5AD' },
          { href: '/reports', title: 'Отчеты', description: 'Просмотр отчетности', bgColor: '#07575B' }
        ];
      default:
        return [];
    }
  };

  return (
    <div style={{backgroundColor: '#C4DFE6', minHeight: '100vh'}}>
      {/* Заголовок */}
      <div className="bg-white shadow" style={{backgroundColor: '#66A5AD'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#003B46'}}>Главная</h1>
              <p style={{color: '#07575B'}}>
                Добро пожаловать, {userName} ({getRoleDisplayName(userRole)})
              </p>
            </div>
            <div className="flex space-x-4">
              {userRole !== 'observer' && (
                <Link 
                  href="/defects/create"
                  className="px-4 py-2 rounded-md transition-colors text-white hover:opacity-80"
                  style={{backgroundColor: '#07575B'}}
                >
                  Добавить дефект
                </Link>
              )}
              <Link 
                href="/auth/login"
                className="px-4 py-2 rounded-md transition-colors hover:opacity-80"
                style={{backgroundColor: '#C4DFE6', color: '#003B46'}}
              >
                Выход
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded bg-blue-100">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Всего дефектов</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalDefects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded bg-yellow-100">
                <div className="w-6 h-6 bg-yellow-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Новые</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.newDefects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded bg-purple-100">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">В работе</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.inProgressDefects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded bg-green-100">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Выполнено</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completedDefects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded bg-indigo-100">
                <div className="w-6 h-6 bg-indigo-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Проекты</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeProjects}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Быстрые действия - адаптивные под роль */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>
                Быстрые действия для {getRoleDisplayName(userRole).toLowerCase()}а
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {getRoleSpecificActions().map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                    style={{backgroundColor: action.bgColor}}
                  >
                    <h3 className="font-medium text-lg mb-1">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Последние дефекты */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Последние дефекты</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentDefects.map((defect) => (
                  <div key={defect.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{defect.title}</h3>
                      <span 
                        className="px-3 py-1 text-xs font-semibold rounded-full border-2 shadow-sm"
                        style={{
                          backgroundColor: getStatusColor(defect.status).bg,
                          color: getStatusColor(defect.status).text,
                          borderColor: getStatusColor(defect.status).border
                        }}
                      >
                        {defect.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{defect.project}</span>
                      <span 
                        className="px-3 py-1 text-xs font-semibold rounded-full border-2 shadow-sm"
                        style={{
                          backgroundColor: getPriorityColor(defect.priority).bg,
                          color: getPriorityColor(defect.priority).text,
                          borderColor: getPriorityColor(defect.priority).border
                        }}
                      >
                        {defect.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/defects" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                  Посмотреть все дефекты →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
