'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  // Заглушки данных для проектов
  const [projects] = useState([
    {
      id: 1,
      name: 'ЖК Солнечный',
      description: 'Жилой комплекс в центральном районе',
      status: 'В процессе',
      defectsCount: 15,
      executor: 'Строй-Инвест ООО',
      startDate: '2024-01-15',
      endDate: '2024-12-20'
    },
    {
      id: 2,
      name: 'Офис Центр',
      description: 'Административное здание в деловом квартале',
      status: 'Завершен',
      defectsCount: 3,
      executor: 'МегаСтрой АО',
      startDate: '2023-06-01',
      endDate: '2024-02-28'
    },
    {
      id: 3,
      name: 'Торговый центр Гранд',
      description: 'Крупный торговый комплекс',
      status: 'Планирование',
      defectsCount: 0,
      executor: 'СтройГрупп ООО',
      startDate: '2024-03-01',
      endDate: '2025-08-30'
    },
    {
      id: 4,
      name: 'Школа №25',
      description: 'Реконструкция образовательного учреждения',
      status: 'В процессе',
      defectsCount: 8,
      executor: 'СпецСтрой ООО',
      startDate: '2024-02-01',
      endDate: '2024-08-31'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Все');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Планирование': return 'bg-gray-100 text-gray-800';
      case 'В процессе': return 'bg-blue-100 text-blue-800';
      case 'Завершен': return 'bg-green-100 text-green-800';
      case 'Приостановлен': return 'bg-yellow-100 text-yellow-800';
      case 'Отменен': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Все' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Статус проекта
                </label>
                <select
                  id="status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Все">Все статусы</option>
                  <option value="Планирование">Планирование</option>
                  <option value="В процессе">В процессе</option>
                  <option value="Завершен">Завершен</option>
                  <option value="Приостановлен">Приостановлен</option>
                  <option value="Отменен">Отменен</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('Все');
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
              <p className="text-sm text-gray-600">Всего проектов</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {projects.filter(p => p.status === 'В процессе').length}
              </p>
              <p className="text-sm text-gray-600">В процессе</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-600">
                {projects.filter(p => p.status === 'Завершен').length}
              </p>
              <p className="text-sm text-gray-600">Завершено</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {projects.reduce((sum, p) => sum + p.defectsCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Всего дефектов</p>
            </div>
          </div>
        </div>

        {/* Список проектов */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Проекты ({filteredProjects.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <div key={project.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900 mr-3">
                        {project.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Исполнитель:</span>
                        <br />
                        {project.executor}
                      </div>
                      <div>
                        <span className="font-medium">Дефектов:</span>
                        <br />
                        <span className={project.defectsCount > 0 ? 'text-orange-600 font-semibold' : 'text-green-600'}>
                          {project.defectsCount}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Начало:</span>
                        <br />
                        {new Date(project.startDate).toLocaleDateString('ru-RU')}
                      </div>
                      <div>
                        <span className="font-medium">Окончание:</span>
                        <br />
                        {new Date(project.endDate).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex space-x-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Подробнее
                    </Link>
                    <Link
                      href={`/projects/${project.id}/defects`}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      Дефекты
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
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
  );
}
