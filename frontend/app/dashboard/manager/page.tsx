'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ManagerDashboard() {
  const [userName] = useState('Петров Иван Сергеевич');

  // Заглушки данных для менеджера
  const managerStats = {
    totalDefects: 45,
    newDefects: 8,
    inProgressDefects: 22,
    overdueDefects: 5,
    activeProjects: 4,
    teamMembers: 12
  };

  const criticalDefects = [
    { 
      id: 1, 
      title: 'Критическая трещина в несущей конструкции', 
      project: 'ЖК Солнечный',
      executor: 'Смирнов А.В.',
      deadline: '2024-01-18',
      priority: 'Критический'
    },
    { 
      id: 2, 
      title: 'Протечка кровли', 
      project: 'Офис Центр',
      executor: 'Козлова М.А.',
      deadline: '2024-01-20',
      priority: 'Высокий'
    },
    { 
      id: 3, 
      title: 'Дефект электропроводки', 
      project: 'Торговый центр',
      executor: 'Не назначен',
      deadline: '2024-01-22',
      priority: 'Высокий'
    }
  ];

  const teamPerformance = [
    { name: 'Смирнов А.В.', assigned: 12, completed: 10, efficiency: 83 },
    { name: 'Козлова М.А.', assigned: 8, completed: 7, efficiency: 87 },
    { name: 'Петров П.П.', assigned: 6, completed: 5, efficiency: 83 },
    { name: 'Сидоров С.С.', assigned: 15, completed: 11, efficiency: 73 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Критический': return { bg: '#FF4444', text: 'white' };
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
              <h1 className="text-3xl font-bold" style={{color: '#003B46'}}>Панель менеджера</h1>
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
                Добавить дефект
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
        {/* Статистика менеджера */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#66A5AD'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{managerStats.totalDefects}</p>
              <p className="text-sm" style={{color: '#07575B'}}>Всего дефектов</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#07575B'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{managerStats.newDefects}</p>
              <p className="text-sm" style={{color: '#07575B'}}>Новые</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#003B46'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{managerStats.inProgressDefects}</p>
              <p className="text-sm" style={{color: '#07575B'}}>В работе</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#FF4444'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{managerStats.overdueDefects}</p>
              <p className="text-sm" style={{color: '#07575B'}}>Просрочено</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#C4DFE6'}}>
                <div className="w-6 h-6 rounded" style={{backgroundColor: '#003B46'}}></div>
              </div>
              <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{managerStats.activeProjects}</p>
              <p className="text-sm" style={{color: '#07575B'}}>Проекты</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-center">
              <div className="p-3 rounded mx-auto mb-2 w-fit" style={{backgroundColor: '#66A5AD'}}>
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <p className="text-2xl font-semibold" style={{color: '#003B46'}}>{managerStats.teamMembers}</p>
              <p className="text-sm" style={{color: '#07575B'}}>Команда</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Управление */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>
                Управление
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <Link
                  href="/defects"
                  className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  style={{backgroundColor: '#66A5AD'}}
                >
                  <h3 className="font-medium text-lg mb-1">Управление дефектами</h3>
                  <p className="text-sm opacity-90">Назначение, контроль и управление статусами</p>
                </Link>

                <Link
                  href="/projects"
                  className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  style={{backgroundColor: '#07575B'}}
                >
                  <h3 className="font-medium text-lg mb-1">Проекты</h3>
                  <p className="text-sm opacity-90">Управление строительными проектами</p>
                </Link>

                <Link
                  href="/users"
                  className="block p-4 rounded-lg transition-all duration-200 text-white hover:shadow-lg hover:-translate-y-0.5 hover:opacity-90"
                  style={{backgroundColor: '#003B46'}}
                >
                  <h3 className="font-medium text-lg mb-1">Команда</h3>
                  <p className="text-sm opacity-90">Управление пользователями и ролями</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Критические дефекты */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>Критические дефекты</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {criticalDefects.map((defect) => (
                  <div key={defect.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">{defect.title}</h3>
                      <span 
                        className="px-2 py-1 text-xs font-semibold rounded-full"
                        style={{
                          backgroundColor: getPriorityColor(defect.priority).bg,
                          color: getPriorityColor(defect.priority).text
                        }}
                      >
                        {defect.priority}
                      </span>
                    </div>
                    <div className="text-xs mb-2" style={{color: '#07575B'}}>
                      Проект: {defect.project}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span style={{color: '#07575B'}}>
                        Исполнитель: {defect.executor}
                      </span>
                      <span style={{color: '#07575B'}}>
                        Срок: {new Date(defect.deadline).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link 
                  href="/defects?priority=high" 
                  className="text-sm font-medium hover:opacity-80"
                  style={{color: '#07575B'}}
                >
                  Все критические дефекты →
                </Link>
              </div>
            </div>
          </div>

          {/* Производительность команды */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>Производительность команды</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{color: '#003B46'}}>
                        {member.name}
                      </div>
                      <div className="text-xs" style={{color: '#07575B'}}>
                        {member.completed}/{member.assigned} выполнено
                      </div>
                    </div>
                    <div className="flex items-center ml-4">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${member.efficiency}%`,
                            backgroundColor: member.efficiency >= 80 ? '#66A5AD' : member.efficiency >= 70 ? '#FF8800' : '#FF4444'
                          }}
                        ></div>
                      </div>
                      <span className="text-xs" style={{color: '#003B46'}}>{member.efficiency}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link 
                  href="/reports/team-performance" 
                  className="text-sm font-medium hover:opacity-80"
                  style={{color: '#07575B'}}
                >
                  Подробный отчет →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Отчетность */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold" style={{color: '#003B46'}}>Отчетность и аналитика</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link 
                href="/reports" 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow text-center"
                style={{borderColor: '#66A5AD'}}
              >
                <h3 className="font-medium mb-2" style={{color: '#003B46'}}>Сводные отчеты</h3>
                <p className="text-sm" style={{color: '#07575B'}}>Общая статистика по проектам</p>
              </Link>

              <Link 
                href="/analytics" 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow text-center"
                style={{borderColor: '#66A5AD'}}
              >
                <h3 className="font-medium mb-2" style={{color: '#003B46'}}>Аналитика</h3>
                <p className="text-sm" style={{color: '#07575B'}}>Глубокий анализ данных</p>
              </Link>

              <Link 
                href="/reports/export" 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow text-center"
                style={{borderColor: '#66A5AD'}}
              >
                <h3 className="font-medium mb-2" style={{color: '#003B46'}}>Экспорт данных</h3>
                <p className="text-sm" style={{color: '#07575B'}}>Выгрузка в Excel/CSV</p>
              </Link>

              <Link 
                href="/reports/schedule" 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow text-center"
                style={{borderColor: '#66A5AD'}}
              >
                <h3 className="font-medium mb-2" style={{color: '#003B46'}}>Регулярные отчеты</h3>
                <p className="text-sm" style={{color: '#07575B'}}>Настройка автоотчетов</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
