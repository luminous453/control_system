'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProjects, useDefects } from '../../lib/hooks';
import { ProjectFilters } from '../../lib/types';
import AuthGuard from '../../components/AuthGuard';

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFilters>({});
  const { data: projects, loading: projectsLoading, error: projectsError, refetch } = useProjects(filters);
  const { data: allDefects } = useDefects(); // Получаем все дефекты для подсчёта статистики

  const [searchTerm, setSearchTerm] = useState('');

  // Обновляем фильтры при изменении
  useEffect(() => {
    const newFilters: ProjectFilters = {};
    if (searchTerm) newFilters.search = searchTerm;
    setFilters(newFilters);
  }, [searchTerm]);

  // Подсчёт дефектов по проектам
  const getDefectsCountByProject = (projectId: number) => {
    if (!allDefects) return 0;
    return allDefects.filter(defect => defect.project_id === projectId).length;
  };

  // Статистика проектов
  const getProjectStats = () => {
    if (!projects || !allDefects) return { total: 0, active: 0, totalDefects: 0 };
    
    return {
      total: projects.length,
      active: projects.length, // Все проекты считаем активными
      totalDefects: allDefects.length
    };
  };
  
  const stats = getProjectStats();

  return (
    <AuthGuard>
      <div className="min-h-screen" style={{backgroundColor: '#C4DFE6'}}>
      {/* Заголовок */}
      <div className="shadow" style={{backgroundColor: '#66A5AD'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#003B46'}}>Управление проектами</h1>
              <p style={{color: '#07575B'}}>Просмотр и управление строительными проектами</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/projects/create"
                className="text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#07575B'}}
              >
                Создать проект
              </Link>
              <Link 
                href="/dashboard"
                className="px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#C4DFE6', color: '#003B46'}}
              >
                Главная
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Фильтры и поиск */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Поиск по названию или описанию
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите текст для поиска..."
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Статистика */}
        {projectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow text-center animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                <p className="text-sm text-gray-600">Всего проектов</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                <p className="text-sm text-gray-600">Активные</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">{stats.totalDefects}</p>
                <p className="text-sm text-gray-600">Всего дефектов</p>
              </div>
            </div>
          </div>
        )}

        {/* Список проектов */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Проекты {projects ? `(${projects.length})` : ''}
            </h2>
          </div>
          
          {projectsLoading ? (
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
          ) : projectsError ? (
            <div className="p-12 text-center">
              <p className="text-red-600">Ошибка загрузки проектов: {projectsError}</p>
              <button 
                onClick={() => refetch()}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Попробовать снова
              </button>
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {projects.map((project) => {
                const defectsCount = getDefectsCountByProject(project.id);
                return (
                  <div key={project.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-medium text-gray-900 mr-3">
                            {project.name}
                          </h3>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Активный
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{project.description || 'Описание отсутствует'}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Ответственный:</span>
                            <br />
                            {project.default_executor?.full_name || 'Не назначен'}
                          </div>
                          <div>
                            <span className="font-medium">Дефектов:</span>
                            <br />
                            <span className={defectsCount > 0 ? 'text-orange-600 font-semibold' : 'text-green-600'}>
                              {defectsCount}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Создано:</span>
                            <br />
                            {new Date(project.created_at).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6 flex space-x-2">
                        <Link
                          href={`/projects/${project.id}`}
                          className="text-white px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                          style={{backgroundColor: '#07575B'}}
                        >
                          Подробнее
                        </Link>
                        <Link
                          href={`/defects?project_id=${project.id}`}
                          className="px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                          style={{backgroundColor: '#C4DFE6', color: '#003B46'}}
                        >
                          Дефекты
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">Проекты не найдены</p>
              <p className="text-sm text-gray-400 mt-1">
                Попробуйте изменить критерии поиска или создайте новый проект
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </AuthGuard>
  );
}
