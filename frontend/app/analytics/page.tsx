'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedProject, setSelectedProject] = useState('all');

  // Заглушки данных для аналитики
  const projects = [
    { id: 'all', name: 'Все проекты' },
    { id: 1, name: 'ЖК Солнечный' },
    { id: 2, name: 'Офис Центр' },
    { id: 3, name: 'Торговый центр Гранд' },
    { id: 4, name: 'Школа №25' }
  ];

  const kpiData = {
    totalDefects: 45,
    resolvedDefects: 28,
    averageResolutionTime: 7.2,
    overdueDefects: 5,
    costSavings: 450000,
    efficiencyScore: 85.4
  };

  const trendData = [
    { period: 'Янв 2024', created: 12, resolved: 8, overdue: 2 },
    { period: 'Фев 2024', created: 15, resolved: 12, overdue: 1 },
    { period: 'Мар 2024', created: 18, resolved: 16, overdue: 2 },
    { period: 'Апр 2024', created: 10, resolved: 14, overdue: 0 },
    { period: 'Май 2024', created: 8, resolved: 11, overdue: 1 }
  ];

  const categoryAnalysis = [
    { category: 'Конструктивные', count: 15, avgCost: 75000, avgTime: 12.5 },
    { category: 'Отделочные', count: 12, avgCost: 25000, avgTime: 5.2 },
    { category: 'Кровельные', count: 8, avgCost: 45000, avgTime: 8.1 },
    { category: 'Инженерные системы', count: 6, avgCost: 35000, avgTime: 6.8 },
    { category: 'Электрика', count: 4, avgCost: 20000, avgTime: 4.3 }
  ];

  const performanceData = [
    { 
      executor: 'Петров П.П.', 
      assigned: 12, 
      resolved: 10, 
      avgTime: 6.2, 
      efficiency: 83.3,
      rating: 'Отлично'
    },
    { 
      executor: 'Козлов К.К.', 
      assigned: 8, 
      resolved: 7, 
      avgTime: 7.8, 
      efficiency: 87.5,
      rating: 'Отлично'
    },
    { 
      executor: 'Сидоров С.С.', 
      assigned: 15, 
      resolved: 11, 
      avgTime: 9.1, 
      efficiency: 73.3,
      rating: 'Хорошо'
    },
    { 
      executor: 'Николаев Н.Н.', 
      assigned: 6, 
      resolved: 5, 
      avgTime: 5.4, 
      efficiency: 83.3,
      rating: 'Отлично'
    }
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Отлично': return 'bg-green-100 text-green-800';
      case 'Хорошо': return 'bg-yellow-100 text-yellow-800';
      case 'Удовлетворительно': return 'bg-orange-100 text-orange-800';
      case 'Неудовлетворительно': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#C4DFE6'}}>
      {/* Заголовок */}
      <div className="shadow" style={{backgroundColor: '#66A5AD'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#003B46'}}>Аналитика</h1>
              <p style={{color: '#07575B'}}>Глубокий анализ данных по дефектам и производительности</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/reports"
                className="text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#07575B'}}
              >
                Отчеты
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
        {/* Фильтры */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
                Период анализа
              </label>
              <select
                id="period"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">Последняя неделя</option>
                <option value="month">Последний месяц</option>
                <option value="quarter">Последний квартал</option>
                <option value="year">Последний год</option>
              </select>
            </div>

            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                Проект
              </label>
              <select
                id="project"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => alert('Заглушка: Обновление аналитики')}
                className="w-full text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#07575B'}}
              >
                Обновить данные
              </button>
            </div>
          </div>
        </div>

        {/* KPI Метрики */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Всего дефектов</p>
                <p className="text-2xl font-semibold text-gray-900">{kpiData.totalDefects}</p>
                <p className="text-xs text-green-600">+12% к предыдущему периоду</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Решено дефектов</p>
                <p className="text-2xl font-semibold text-gray-900">{kpiData.resolvedDefects}</p>
                <p className="text-xs text-green-600">
                  {((kpiData.resolvedDefects / kpiData.totalDefects) * 100).toFixed(1)}% от общего числа
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Среднее время решения</p>
                <p className="text-2xl font-semibold text-gray-900">{kpiData.averageResolutionTime}</p>
                <p className="text-xs text-red-600">дней (-0.8 к предыдущему)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <div className="w-6 h-6 bg-red-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Просроченные</p>
                <p className="text-2xl font-semibold text-gray-900">{kpiData.overdueDefects}</p>
                <p className="text-xs text-red-600">{((kpiData.overdueDefects / kpiData.totalDefects) * 100).toFixed(1)}% от общего числа</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <div className="w-6 h-6 bg-yellow-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Экономия средств</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(kpiData.costSavings / 1000).toFixed(0)}К ₽
                </p>
                <p className="text-xs text-green-600">+15% к предыдущему периоду</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100">
                <div className="w-6 h-6 bg-indigo-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Индекс эффективности</p>
                <p className="text-2xl font-semibold text-gray-900">{kpiData.efficiencyScore}%</p>
                <p className="text-xs text-green-600">+3.2% к предыдущему</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Тренды */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Динамика по месяцам</h2>
            <div className="space-y-4">
              {trendData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-20">{item.period}</span>
                  <div className="flex-1 mx-4">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
                        <span>Создано: {item.created}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                        <span>Решено: {item.resolved}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
                        <span>Просрочено: {item.overdue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Анализ по категориям */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Анализ по категориям</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Категория
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Кол-во
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ср. стоимость
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ср. время
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categoryAnalysis.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-4 text-sm font-medium text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900">{item.count}</td>
                      <td className="px-3 py-4 text-sm text-gray-900">
                        {(item.avgCost / 1000).toFixed(0)}К ₽
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900">{item.avgTime} дн.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Производительность исполнителей */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Производительность исполнителей</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Исполнитель
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Назначено
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Решено
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Среднее время
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Эффективность
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Рейтинг
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {performanceData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.executor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.assigned}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        {item.resolved}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.avgTime} дн.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${item.efficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{item.efficiency}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRatingColor(item.rating)}`}>
                          {item.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
