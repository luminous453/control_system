'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('defects-summary');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });
  const [selectedProject, setSelectedProject] = useState('all');

  // Заглушки данных для отчетов
  const projects = [
    { id: 'all', name: 'Все проекты' },
    { id: 1, name: 'ЖК Солнечный' },
    { id: 2, name: 'Офис Центр' },
    { id: 3, name: 'Торговый центр Гранд' },
    { id: 4, name: 'Школа №25' }
  ];

  const reportTypes = [
    {
      id: 'defects-summary',
      name: 'Сводка по дефектам',
      description: 'Общая информация о количестве и статусах дефектов'
    },
    {
      id: 'defects-by-project',
      name: 'Дефекты по проектам',
      description: 'Распределение дефектов по строительным проектам'
    },
    {
      id: 'defects-by-priority',
      name: 'Дефекты по приоритету',
      description: 'Анализ дефектов по уровням приоритета'
    },
    {
      id: 'overdue-defects',
      name: 'Просроченные дефекты',
      description: 'Список дефектов с нарушенными сроками'
    },
    {
      id: 'performance-report',
      name: 'Отчет по производительности',
      description: 'Анализ времени устранения дефектов по исполнителям'
    },
    {
      id: 'cost-analysis',
      name: 'Анализ затрат',
      description: 'Финансовый анализ стоимости устранения дефектов'
    }
  ];

  // Заглушки данных для демонстрации отчетов
  const summaryData = {
    totalDefects: 45,
    newDefects: 8,
    inProgressDefects: 22,
    completedDefects: 15,
    overdueDefects: 5,
    averageResolutionTime: 7.2
  };

  const projectData = [
    { project: 'ЖК Солнечный', total: 15, new: 3, inProgress: 8, completed: 4 },
    { project: 'Офис Центр', total: 12, new: 2, inProgress: 5, completed: 5 },
    { project: 'Торговый центр Гранд', total: 10, new: 2, inProgress: 6, completed: 2 },
    { project: 'Школа №25', total: 8, new: 1, inProgress: 3, completed: 4 }
  ];

  const priorityData = [
    { priority: 'Критический', count: 5, percentage: 11.1 },
    { priority: 'Высокий', count: 12, percentage: 26.7 },
    { priority: 'Средний', count: 20, percentage: 44.4 },
    { priority: 'Низкий', count: 8, percentage: 17.8 }
  ];

  const overdueData = [
    { id: 1, title: 'Трещина в стене', project: 'ЖК Солнечный', daysOverdue: 5, assignee: 'Петров П.П.' },
    { id: 3, title: 'Протечка кровли', project: 'Торговый центр', daysOverdue: 3, assignee: 'Козлов К.К.' },
    { id: 7, title: 'Неисправность лифта', project: 'Офис Центр', daysOverdue: 8, assignee: 'Сидоров С.С.' }
  ];

  const handleGenerateReport = () => {
    alert('Заглушка: Отчет сгенерирован!');
  };

  const handleExportReport = (format: string) => {
    alert(`Заглушка: Экспорт отчета в формате ${format}`);
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'defects-summary':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Сводка по дефектам</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{summaryData.totalDefects}</p>
                <p className="text-sm text-gray-600">Всего дефектов</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{summaryData.newDefects}</p>
                <p className="text-sm text-gray-600">Новые</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{summaryData.inProgressDefects}</p>
                <p className="text-sm text-gray-600">В работе</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{summaryData.completedDefects}</p>
                <p className="text-sm text-gray-600">Завершено</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{summaryData.overdueDefects}</p>
                <p className="text-sm text-gray-600">Просрочено</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-indigo-600">{summaryData.averageResolutionTime}</p>
                <p className="text-sm text-gray-600">Среднее время (дни)</p>
              </div>
            </div>
          </div>
        );

      case 'defects-by-project':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Дефекты по проектам</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Проект
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Всего
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Новые
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      В работе
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Завершено
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projectData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">{item.new}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{item.inProgress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{item.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'defects-by-priority':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Дефекты по приоритету</h3>
            <div className="space-y-4">
              {priorityData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900">{item.priority}</span>
                    <div className="w-64 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">{item.count}</span>
                    <span className="text-sm text-gray-600 ml-2">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'overdue-defects':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Просроченные дефекты</h3>
            <div className="space-y-4">
              {overdueData.map((item) => (
                <div key={item.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.project}</p>
                      <p className="text-sm text-gray-600">Исполнитель: {item.assignee}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-red-100 text-red-800 px-2 py-1 text-xs font-medium rounded-full">
                        Просрочено на {item.daysOverdue} дн.
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Выберите тип отчета для просмотра данных</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#C4DFE6'}}>
      {/* Заголовок */}
      <div className="shadow" style={{backgroundColor: '#66A5AD'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#003B46'}}>Отчетность</h1>
              <p style={{color: '#07575B'}}>Генерация и просмотр отчетов по дефектам</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковая панель с типами отчетов */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Типы отчетов</h2>
              <div className="space-y-2">
                {reportTypes.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedReport === report.id
                        ? 'border text-white'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                    style={{
                      backgroundColor: selectedReport === report.id ? '#07575B' : 'transparent',
                      borderColor: selectedReport === report.id ? '#003B46' : 'transparent'
                    }}
                  >
                    <div>
                      <p className="font-medium text-sm" style={{
                        color: selectedReport === report.id ? 'white' : '#003B46'
                      }}>{report.name}</p>
                      <p className="text-xs mt-1" style={{
                        color: selectedReport === report.id ? '#C4DFE6' : '#07575B'
                      }}>{report.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Фильтры */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Фильтры</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                    Проект
                  </label>
                  <select
                    id="project"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Период с
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Период по
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <button
                  onClick={handleGenerateReport}
                  className="w-full text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity text-sm"
                  style={{backgroundColor: '#07575B'}}
                >
                  Обновить отчет
                </button>
              </div>
            </div>
          </div>

          {/* Основная область с отчетом */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {reportTypes.find(r => r.id === selectedReport)?.name || 'Отчет'}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleExportReport('PDF')}
                      className="text-white px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                      style={{backgroundColor: '#07575B'}}
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => handleExportReport('Excel')}
                      className="text-white px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                      style={{backgroundColor: '#66A5AD'}}
                    >
                      Excel
                    </button>
                    <button
                      onClick={() => handleExportReport('CSV')}
                      className="text-white px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                      style={{backgroundColor: '#003B46'}}
                    >
                      CSV
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {renderReportContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
