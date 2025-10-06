'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDefects, useProjects, useDefectStatuses } from '../../lib/hooks';
import { PRIORITY_LABELS, PRIORITY_COLORS, DefectFilters } from '../../lib/types';
import AuthGuard from '../../components/AuthGuard';

export default function DefectsPage() {
  const [filters, setFilters] = useState<DefectFilters>({});
  const { data: defects, loading: defectsLoading, error: defectsError, refetch } = useDefects(filters);
  const { data: projects } = useProjects();
  const { data: statuses } = useDefectStatuses();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterProject, setFilterProject] = useState('');

  // Обновляем фильтры при изменении параметров
  useEffect(() => {
    const newFilters: DefectFilters = {};
    if (searchTerm) newFilters.search = searchTerm;
    if (filterStatus && filterStatus !== 'Все') newFilters.status = filterStatus;
    if (filterPriority && filterPriority !== 'Все') newFilters.priority = parseInt(filterPriority);
    if (filterProject && filterProject !== 'Все') newFilters.project_id = parseInt(filterProject);
    
    setFilters(newFilters);
  }, [searchTerm, filterStatus, filterPriority, filterProject]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новая': return { bg: '#66A5AD', text: 'white' };
      case 'В работе': return { bg: '#07575B', text: 'white' };
      case 'На проверке': return { bg: '#003B46', text: 'white' };
      case 'Закрыта': return { bg: '#C4DFE6', text: '#003B46' };
      case 'Отменена': return { bg: '#FF4444', text: 'white' };
      default: return { bg: '#C4DFE6', text: '#07575B' };
    }
  };

  const getPriorityColor = (priority: number) => {
    const colors = PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS];
    return colors || { bg: '#C4DFE6', text: '#07575B' };
  };

  const isOverdue = (deadline: string, status: string) => {
    if (status === 'Закрыта' || status === 'Отменена') return false;
    return new Date(deadline) < new Date();
  };

  // Статистика дефектов
  const getDefectStats = () => {
    if (!defects) return { total: 0, new: 0, inProgress: 0, completed: 0, overdue: 0 };
    
    return {
      total: defects.length,
      new: defects.filter(d => d.status?.name === 'Новая').length,
      inProgress: defects.filter(d => d.status?.name === 'В работе').length,
      completed: defects.filter(d => d.status?.name === 'Закрыта').length,
      overdue: defects.filter(d => d.deadline && isOverdue(d.deadline, d.status?.name || '')).length
    };
  };

  const stats = getDefectStats();

  return (
    <AuthGuard>
      <div className="min-h-screen" style={{backgroundColor: '#C4DFE6'}}>
      {/* Заголовок */}
      <div className="shadow" style={{backgroundColor: '#66A5AD'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#003B46'}}>Управление дефектами</h1>
              <p style={{color: '#07575B'}}>Регистрация, отслеживание и контроль дефектов</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/defects/create"
                className="text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#07575B'}}
              >
                Добавить дефект
              </Link>
              <Link 
                href="/dashboard"
                className="px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#C4DFE6', color: '#003B46'}}
              >
                Дашборд
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Фильтры и поиск */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Поиск
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Поиск по названию..."
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Статус
                </label>
                <select
                  id="status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Все статусы</option>
                  {statuses?.map(status => (
                    <option key={status.id} value={status.name}>{status.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Приоритет
                </label>
                <select
                  id="priority"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Все приоритеты</option>
                  <option value="1">{PRIORITY_LABELS[1]}</option>
                  <option value="2">{PRIORITY_LABELS[2]}</option>
                  <option value="3">{PRIORITY_LABELS[3]}</option>
                </select>
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                  Проект
                </label>
                <select
                  id="project"
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Все проекты</option>
                  {projects?.map(project => (
                    <option key={project.id} value={project.id.toString()}>{project.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('');
                    setFilterPriority('');
                    setFilterProject('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                  Сбросить
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Статистика */}
        {defectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow text-center animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-gray-600">Всего</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.new}</p>
              <p className="text-sm text-gray-600">Новые</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              <p className="text-sm text-gray-600">В работе</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-gray-600">Закрыто</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              <p className="text-sm text-gray-600">Просрочено</p>
            </div>
          </div>
        )}

        {/* Список дефектов */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Дефекты {defects ? `(${defects.length})` : ''}
            </h2>
          </div>
          
          {defectsLoading ? (
            <div className="divide-y divide-gray-200">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : defectsError ? (
            <div className="p-12 text-center">
              <p className="text-red-600">Ошибка загрузки дефектов: {defectsError}</p>
              <button 
                onClick={() => refetch()}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Попробовать снова
              </button>
            </div>
          ) : defects && defects.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {defects.map((defect) => (
                <div key={defect.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-medium text-gray-900 mr-3">
                          {defect.description.substring(0, 60)}{defect.description.length > 60 ? '...' : ''}
                        </h3>
                        {defect.deadline && isOverdue(defect.deadline, defect.status?.name || '') && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 text-xs font-medium rounded-full mr-2">
                            Просрочено
                          </span>
                        )}
                        <span 
                          className="px-2 py-1 text-xs font-medium rounded-full mr-2"
                          style={{
                            backgroundColor: getStatusColor(defect.status?.name || '').bg,
                            color: getStatusColor(defect.status?.name || '').text
                          }}
                        >
                          {defect.status?.name}
                        </span>
                        <span 
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: getPriorityColor(defect.priority).bg,
                            color: getPriorityColor(defect.priority).text
                          }}
                        >
                          {PRIORITY_LABELS[defect.priority as keyof typeof PRIORITY_LABELS]}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{defect.description}</p>
                    </div>
                    
                    <div className="ml-6 flex space-x-2">
                      <Link
                        href={`/defects/${defect.id}`}
                        className="text-white px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                        style={{backgroundColor: '#07575B'}}
                      >
                        Подробнее
                      </Link>
                      <Link
                        href={`/defects/${defect.id}/edit`}
                        className="px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                        style={{backgroundColor: '#C4DFE6', color: '#003B46'}}
                      >
                        Изменить
                      </Link>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Проект:</span>
                      <br />
                      <Link href={`/projects/${defect.project_id}`} className="text-blue-600 hover:text-blue-500">
                        {defect.project?.name}
                      </Link>
                    </div>
                    <div>
                      <span className="font-medium">Исполнитель:</span>
                      <br />
                      <span className={!defect.executor ? 'text-red-600' : 'text-gray-900'}>
                        {defect.executor?.full_name || 'Не назначен'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Срок выполнения:</span>
                      <br />
                      {defect.deadline ? (
                        <span className={isOverdue(defect.deadline, defect.status?.name || '') ? 'text-red-600' : 'text-gray-900'}>
                          {new Date(defect.deadline).toLocaleDateString('ru-RU')}
                        </span>
                      ) : (
                        <span className="text-gray-400">Не указан</span>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Создано:</span>
                      <br />
                      {new Date(defect.created_at).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">Дефекты не найдены</p>
              <p className="text-sm text-gray-400 mt-1">
                Попробуйте изменить критерии поиска или создайте новый дефект
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </AuthGuard>
  );
}
