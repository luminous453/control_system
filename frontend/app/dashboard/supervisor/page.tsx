'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SupervisorDashboard() {
  const [userName] = useState('Директор Строительства');

  // Заглушки данных для руководителя
  const executiveSummary = {
    totalProjects: 4,
    activeProjects: 3,
    totalDefects: 45,
    resolvedDefects: 28,
    criticalDefects: 3,
    completionRate: 62.2,
    averageResolutionTime: 7.2,
    costSavings: 450000
  };

  const projectSummary = [
    { 
      name: 'ЖК Солнечный', 
      progress: 75, 
      defects: 18, 
      resolved: 12, 
      status: 'В процессе',
      budget: 15000000,
      timeline: 'В срок'
    },
    { 
      name: 'Офис Центр', 
      progress: 90, 
      defects: 8, 
      resolved: 7, 
      status: 'Завершение',
      budget: 8500000,
      timeline: 'В срок'
    },
    { 
      name: 'Торговый центр', 
      progress: 45, 
      defects: 15, 
      resolved: 7, 
      status: 'В процессе',
      budget: 25000000,
      timeline: 'Риск задержки'
    },
    { 
      name: 'Школа №25', 
      progress: 60, 
      defects: 4, 
      resolved: 2, 
      status: 'В процессе',
      budget: 12000000,
      timeline: 'В срок'
    }
  ];

  const getTimelineColor = (timeline: string) => {
    switch (timeline) {
      case 'В срок': return '#66A5AD';
      case 'Риск задержки': return '#FF8800';
      case 'Просрочено': return '#FF4444';
      default: return '#C4DFE6';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В процессе': return '#07575B';
      case 'Завершение': return '#66A5AD';
      case 'Завершен': return '#003B46';
      case 'Приостановлен': return '#FF8800';
      default: return '#C4DFE6';
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#C4DFE6'}}>
      {/* Заголовок */}
      <div className="shadow" style={{backgroundColor: '#66A5AD'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#003B46'}}>Панель руководителя</h1>
              <p style={{color: '#07575B'}}>
                Добро пожаловать, {userName}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/analytics"
                className="text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#07575B'}}
              >
                Аналитика
              </Link>
              <Link 
                href="/reports"
                className="text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#003B46'}}
              >
                Отчеты
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
        {/* Ключевые показатели */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#66A5AD'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <p className="text-3xl font-bold" style={{color: '#003B46'}}>{executiveSummary.activeProjects}</p>
              <p className="text-sm" style={{color: '#07575B'}}>Активные проекты</p>
              <p className="text-xs mt-1" style={{color: '#07575B'}}>из {executiveSummary.totalProjects} общих</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#07575B'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <p className="text-3xl font-bold" style={{color: '#003B46'}}>{executiveSummary.completionRate}%</p>
              <p className="text-sm" style={{color: '#07575B'}}>Процент завершения</p>
              <p className="text-xs mt-1 text-green-600">+5.2% к предыдущему периоду</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#003B46'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <p className="text-3xl font-bold" style={{color: '#003B46'}}>{executiveSummary.criticalDefects}</p>
              <p className="text-sm" style={{color: '#07575B'}}>Критические дефекты</p>
              <p className="text-xs mt-1 text-red-600">Требуют внимания</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#C4DFE6'}}>
                <div className="w-6 h-6 rounded" style={{backgroundColor: '#003B46'}}></div>
              </div>
              <p className="text-3xl font-bold" style={{color: '#003B46'}}>{(executiveSummary.costSavings / 1000000).toFixed(1)}М</p>
              <p className="text-sm" style={{color: '#07575B'}}>Экономия средств</p>
              <p className="text-xs mt-1 text-green-600">+15% к плану</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Быстрые действия */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>
                Основные разделы
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <Link
                  href="/analytics"
                  className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  style={{backgroundColor: '#66A5AD'}}
                >
                  <h3 className="font-medium text-lg mb-1">Аналитика проектов</h3>
                  <p className="text-sm opacity-90">Детальный анализ производительности и показателей</p>
                </Link>

                <Link
                  href="/reports"
                  className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  style={{backgroundColor: '#07575B'}}
                >
                  <h3 className="font-medium text-lg mb-1">Сводные отчеты</h3>
                  <p className="text-sm opacity-90">Готовые отчеты для принятия решений</p>
                </Link>

                <Link
                  href="/projects"
                  className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  style={{backgroundColor: '#003B46'}}
                >
                  <h3 className="font-medium text-lg mb-1">Обзор проектов</h3>
                  <p className="text-sm opacity-90">Общий статус всех строительных проектов</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Сводка по проектам - занимает 2 колонки */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>Статус проектов</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {projectSummary.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg" style={{color: '#003B46'}}>{project.name}</h3>
                        <p className="text-sm" style={{color: '#07575B'}}>
                          Бюджет: {(project.budget / 1000000).toFixed(1)} млн ₽
                        </p>
                      </div>
                      <div className="text-right">
                        <span 
                          className="px-3 py-1 text-xs font-semibold rounded-full text-white"
                          style={{backgroundColor: getStatusColor(project.status)}}
                        >
                          {project.status}
                        </span>
                        <div className="mt-1">
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded"
                            style={{
                              backgroundColor: getTimelineColor(project.timeline),
                              color: 'white'
                            }}
                          >
                            {project.timeline}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs" style={{color: '#07575B'}}>Прогресс</p>
                        <div className="flex items-center mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="h-2 rounded-full"
                              style={{ 
                                width: `${project.progress}%`,
                                backgroundColor: '#66A5AD'
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium" style={{color: '#003B46'}}>
                            {project.progress}%
                          </span>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-xs" style={{color: '#07575B'}}>Дефекты</p>
                        <p className="text-lg font-semibold" style={{color: '#003B46'}}>
                          {project.defects}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-xs" style={{color: '#07575B'}}>Решено</p>
                        <p className="text-lg font-semibold text-green-600">
                          {project.resolved}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm" style={{color: '#07575B'}}>
                        Готовность: {((project.resolved / project.defects) * 100).toFixed(0)}%
                      </div>
                      <Link 
                        href={`/projects/${index + 1}`}
                        className="text-sm font-medium hover:opacity-80"
                        style={{color: '#07575B'}}
                      >
                        Подробнее →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ключевые метрики */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>Ключевые показатели эффективности</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="p-4 rounded-lg" style={{backgroundColor: '#C4DFE6'}}>
                  <p className="text-2xl font-bold" style={{color: '#003B46'}}>
                    {executiveSummary.averageResolutionTime}
                  </p>
                  <p className="text-sm" style={{color: '#07575B'}}>Среднее время устранения (дни)</p>
                  <p className="text-xs mt-1 text-green-600">-0.8 к предыдущему периоду</p>
                </div>
              </div>

              <div className="text-center">
                <div className="p-4 rounded-lg" style={{backgroundColor: '#C4DFE6'}}>
                  <p className="text-2xl font-bold" style={{color: '#003B46'}}>
                    {((executiveSummary.resolvedDefects / executiveSummary.totalDefects) * 100).toFixed(0)}%
                  </p>
                  <p className="text-sm" style={{color: '#07575B'}}>Процент решенных дефектов</p>
                  <p className="text-xs mt-1 text-green-600">+12% к предыдущему месяцу</p>
                </div>
              </div>

              <div className="text-center">
                <div className="p-4 rounded-lg" style={{backgroundColor: '#C4DFE6'}}>
                  <p className="text-2xl font-bold" style={{color: '#003B46'}}>94%</p>
                  <p className="text-sm" style={{color: '#07575B'}}>Соблюдение сроков</p>
                  <p className="text-xs mt-1 text-green-600">В пределах нормы</p>
                </div>
              </div>

              <div className="text-center">
                <div className="p-4 rounded-lg" style={{backgroundColor: '#C4DFE6'}}>
                  <p className="text-2xl font-bold" style={{color: '#003B46'}}>8.7</p>
                  <p className="text-sm" style={{color: '#07575B'}}>Оценка качества</p>
                  <p className="text-xs mt-1 text-green-600">из 10 возможных</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                href="/analytics"
                className="text-white px-6 py-3 rounded-md hover:opacity-80 transition-opacity font-medium"
                style={{backgroundColor: '#07575B'}}
              >
                Детальная аналитика
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
