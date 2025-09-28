'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id;

  // Заглушка данных для конкретного проекта
  const [project] = useState({
    id: 1,
    name: 'ЖК Солнечный',
    description: 'Жилой комплекс в центральном районе города. Включает 3 корпуса по 25 этажей каждый. Общая площадь застройки составляет 15 000 кв.м. Проект включает в себя подземную парковку, детскую площадку и зеленую зону.',
    status: 'В процессе',
    executor: 'Строй-Инвест ООО',
    startDate: '2024-01-15',
    endDate: '2024-12-20',
    budget: 2500000000,
    address: 'г. Москва, ул. Солнечная, д. 1',
    projectType: 'residential',
    totalArea: 45000,
    floors: 25,
    buildingCount: 3,
    createdAt: '2024-01-10T09:00:00',
    updatedAt: '2024-01-20T15:30:00'
  });

  const [defects] = useState([
    {
      id: 1,
      title: 'Трещина в несущей стене',
      status: 'В работе',
      priority: 'Критический',
      assignee: 'Петров П.П.',
      deadline: '2024-01-25',
      createdAt: '2024-01-15'
    },
    {
      id: 5,
      title: 'Неровность фасада',
      status: 'Новая',
      priority: 'Высокий',
      assignee: 'Не назначен',
      deadline: '2024-01-28',
      createdAt: '2024-01-18'
    },
    {
      id: 8,
      title: 'Проблемы с водоотводом',
      status: 'На проверке',
      priority: 'Средний',
      assignee: 'Козлов К.К.',
      deadline: '2024-01-22',
      createdAt: '2024-01-12'
    }
  ]);

  const [timeline] = useState([
    {
      id: 1,
      date: '2024-01-10',
      type: 'project_created',
      title: 'Проект создан',
      description: 'Проект "ЖК Солнечный" добавлен в систему'
    },
    {
      id: 2,
      date: '2024-01-15',
      type: 'defect_created',
      title: 'Первый дефект зарегистрирован',
      description: 'Обнаружена трещина в несущей стене корпуса №1'
    },
    {
      id: 3,
      date: '2024-01-18',
      type: 'status_changed',
      title: 'Обновлен статус проекта',
      description: 'Статус изменен с "Планирование" на "В процессе"'
    },
    {
      id: 4,
      date: '2024-01-20',
      type: 'milestone',
      title: 'Завершен первый этап',
      description: 'Закончены фундаментальные работы'
    }
  ]);

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Критический': return 'bg-red-100 text-red-800';
      case 'Высокий': return 'bg-orange-100 text-orange-800';
      case 'Средний': return 'bg-yellow-100 text-yellow-800';
      case 'Низкий': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDefectStatusColor = (status: string) => {
    switch (status) {
      case 'Новая': return 'bg-yellow-100 text-yellow-800';
      case 'В работе': return 'bg-blue-100 text-blue-800';
      case 'На проверке': return 'bg-purple-100 text-purple-800';
      case 'Закрыта': return 'bg-green-100 text-green-800';
      case 'Отменена': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectTypeDisplay = (type: string) => {
    switch (type) {
      case 'residential': return 'Жилой';
      case 'commercial': return 'Коммерческий';
      case 'industrial': return 'Промышленный';
      case 'infrastructure': return 'Инфраструктура';
      case 'renovation': return 'Реконструкция';
      default: return 'Не указан';
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'project_created': return '🏗️';
      case 'defect_created': return '⚠️';
      case 'status_changed': return '🔄';
      case 'milestone': return '✅';
      default: return '📌';
    }
  };

  const progressPercentage = Math.round((new Date().getTime() - new Date(project.startDate).getTime()) / 
    (new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600">{project.description}</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href={`/projects/${projectId}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Редактировать
              </Link>
              <Link 
                href="/projects"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                ← К проектам
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Статистика проекта */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{defects.length}</p>
              <p className="text-sm text-gray-600">Всего дефектов</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">
                {defects.filter(d => d.priority === 'Критический').length}
              </p>
              <p className="text-sm text-gray-600">Критических</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {defects.filter(d => d.assignee === 'Не назначен').length}
              </p>
              <p className="text-sm text-gray-600">Без исполнителя</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{progressPercentage}%</p>
              <p className="text-sm text-gray-600">Прогресс</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Описание проекта */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Описание проекта</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{project.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Адрес:</span>
                  <p className="text-gray-600">{project.address}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Тип проекта:</span>
                  <p className="text-gray-600">{getProjectTypeDisplay(project.projectType)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Общая площадь:</span>
                  <p className="text-gray-600">{project.totalArea.toLocaleString()} кв.м</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Количество этажей:</span>
                  <p className="text-gray-600">{project.floors}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Количество корпусов:</span>
                  <p className="text-gray-600">{project.buildingCount}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Бюджет:</span>
                  <p className="text-gray-600">{(project.budget / 1000000).toFixed(0)} млн ₽</p>
                </div>
              </div>
            </div>

            {/* Прогресс проекта */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Прогресс выполнения</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Общий прогресс</span>
                    <span className="text-sm text-gray-600">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Дата начала:</span>
                    <p className="text-gray-600">{new Date(project.startDate).toLocaleDateString('ru-RU')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Плановое окончание:</span>
                    <p className="text-gray-600">{new Date(project.endDate).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Дефекты проекта */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Дефекты проекта ({defects.length})
                  </h2>
                  <Link
                    href={`/defects/create?project=${projectId}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Добавить дефект
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {defects.map((defect) => (
                  <div key={defect.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-medium text-gray-900 mr-3">{defect.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full mr-2 ${getDefectStatusColor(defect.status)}`}>
                            {defect.status}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(defect.priority)}`}>
                            {defect.priority}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Исполнитель:</span>
                            <br />
                            <span className={defect.assignee === 'Не назначен' ? 'text-red-600' : 'text-gray-900'}>
                              {defect.assignee}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Срок:</span>
                            <br />
                            {new Date(defect.deadline).toLocaleDateString('ru-RU')}
                          </div>
                          <div>
                            <span className="font-medium">Создан:</span>
                            <br />
                            {new Date(defect.createdAt).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/defects/${defect.id}`}
                        className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {defects.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-gray-500">В проекте пока нет зарегистрированных дефектов</p>
                  <Link
                    href={`/defects/create?project=${projectId}`}
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium mt-2 inline-block"
                  >
                    Добавить первый дефект →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Детали проекта */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Детали проекта</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ID проекта:</span>
                  <span className="text-gray-900">#{project.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Генподрядчик:</span>
                  <span className="text-gray-900">{project.executor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Создан:</span>
                  <span className="text-gray-900">
                    {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Обновлен:</span>
                  <span className="text-gray-900">
                    {new Date(project.updatedAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">История проекта</h3>
              <div className="space-y-4">
                {timeline.map((event) => (
                  <div key={event.id} className="flex">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm">{getTimelineIcon(event.type)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{event.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Быстрые действия */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
              <div className="space-y-2">
                <Link
                  href={`/defects/create?project=${projectId}`}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm text-center block"
                >
                  Добавить дефект
                </Link>
                <Link
                  href={`/reports?project=${projectId}`}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm text-center block"
                >
                  Отчет по проекту
                </Link>
                <button
                  onClick={() => alert('Заглушка: Экспорт данных проекта')}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                >
                  Экспорт данных
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
