'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrentUser, useDashboardStats, useRecentDefects } from '../../lib/hooks';
import { USER_ROLES, PRIORITY_LABELS, PRIORITY_COLORS } from '../../lib/types';
import AuthGuard from '../../components/AuthGuard';

export default function DashboardPage() {
  const currentUser = useCurrentUser();
  const { data: stats, loading: statsLoading, error: statsError } = useDashboardStats();
  const { data: recentDefects, loading: defectsLoading, error: defectsError } = useRecentDefects(3);

  const getRoleDisplayName = (roleName: string) => {
    switch (roleName) {
      case 'Инженер': return 'Инженер';
      case 'Менеджер': return 'Менеджер';
      case 'Руководитель': return 'Руководитель';
      default: return 'Пользователь';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новая': return { bg: '#66A5AD', text: 'white', border: '#07575B' };
      case 'В работе': return { bg: '#07575B', text: 'white', border: '#003B46' };
      case 'На проверке': return { bg: '#003B46', text: 'white', border: '#003B46' };
      case 'Закрыта': return { bg: '#C4DFE6', text: '#003B46', border: '#66A5AD' };
      default: return { bg: '#C4DFE6', text: '#07575B', border: '#66A5AD' };
    }
  };

  const getPriorityColor = (priority: number) => {
    const colors = PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS];
    return colors || { bg: '#C4DFE6', text: '#07575B' };
  };

  const getRoleSpecificActions = () => {
    if (!currentUser?.role) return [];
    
    switch (currentUser.role.name) {
      case 'Инженер':
        return [
          { href: '/defects', title: 'Мои дефекты', description: 'Просмотр назначенных мне дефектов', bgColor: '#66A5AD' },
          { href: '/defects/create', title: 'Зарегистрировать дефект', description: 'Создать новую запись о дефекте', bgColor: '#07575B' }
        ];
      case 'Менеджер':
        return [
          { href: '/defects', title: 'Управление дефектами', description: 'Назначение и контроль дефектов', bgColor: '#66A5AD' },
          { href: '/projects', title: 'Проекты', description: 'Управление строительными проектами', bgColor: '#07575B' },
          { href: '/reports', title: 'Отчеты', description: 'Формирование отчетности', bgColor: '#003B46' }
        ];
      case 'Руководитель':
        return [
          { href: '/analytics', title: 'Аналитика', description: 'Просмотр аналитических данных', bgColor: '#66A5AD' },
          { href: '/reports', title: 'Отчеты', description: 'Просмотр отчетности', bgColor: '#07575B' }
        ];
      default:
        return [];
    }
  };

  // Показать загрузку или ошибку аутентификации
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#C4DFE6'}}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{color: '#003B46'}}>Необходима авторизация</p>
          <Link href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded">
            Войти в систему
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div style={{backgroundColor: '#C4DFE6', minHeight: '100vh'}}>
      {/* Заголовок */}
      <div className="bg-white shadow" style={{backgroundColor: '#66A5AD'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#003B46'}}>Главная</h1>
              <p style={{color: '#07575B'}}>
                Добро пожаловать, {currentUser.full_name} ({getRoleDisplayName(currentUser.role?.name || '')})
              </p>
            </div>
            <div className="flex space-x-4">
              {currentUser.role?.name !== 'Руководитель' && (
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
        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : statsError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            Ошибка загрузки статистики: {statsError}
          </div>
        ) : stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded bg-blue-100">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Всего дефектов</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total_defects}</p>
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
                  <p className="text-2xl font-semibold text-gray-900">{stats.new_defects}</p>
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
                  <p className="text-2xl font-semibold text-gray-900">{stats.in_progress_defects}</p>
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
                  <p className="text-2xl font-semibold text-gray-900">{stats.completed_defects}</p>
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
                  <p className="text-2xl font-semibold text-gray-900">{stats.active_projects}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Быстрые действия - адаптивные под роль */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>
                Быстрые действия для {getRoleDisplayName(currentUser.role?.name || '').toLowerCase()}а
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
              {defectsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : defectsError ? (
                <div className="text-red-600 text-center py-4">
                  Ошибка загрузки дефектов: {defectsError}
                </div>
              ) : recentDefects && recentDefects.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {recentDefects.map((defect) => (
                      <div key={defect.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{defect.description.substring(0, 50)}...</h3>
                          <span 
                            className="px-3 py-1 text-xs font-semibold rounded-full border-2 shadow-sm"
                            style={{
                              backgroundColor: getStatusColor(defect.status?.name || '').bg,
                              color: getStatusColor(defect.status?.name || '').text,
                              borderColor: getStatusColor(defect.status?.name || '').border
                            }}
                          >
                            {defect.status?.name}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>{defect.project?.name}</span>
                          <span 
                            className="px-3 py-1 text-xs font-semibold rounded-full"
                            style={{
                              backgroundColor: getPriorityColor(defect.priority).bg,
                              color: getPriorityColor(defect.priority).text,
                            }}
                          >
                            {PRIORITY_LABELS[defect.priority as keyof typeof PRIORITY_LABELS]}
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
                </>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  Дефекты не найдены
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </AuthGuard>
  );
}
