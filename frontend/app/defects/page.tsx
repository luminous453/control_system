'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DefectsPage() {
  // Заглушки данных для дефектов
  const [defects] = useState([
    {
      id: 1,
      title: 'Трещина в несущей стене',
      description: 'На 3-м этаже обнаружена трещина длиной 2м в несущей стене',
      status: 'Новая',
      priority: 'Критический',
      project: 'ЖК Солнечный',
      projectId: 1,
      assignee: 'Не назначен',
      reporter: 'Иванов И.И.',
      createdAt: '2024-01-15',
      deadline: '2024-01-25',
      category: 'Конструктивные'
    },
    {
      id: 2,
      title: 'Неровность напольного покрытия',
      description: 'В офисном помещении №205 выявлена неровность пола',
      status: 'В работе',
      priority: 'Средний',
      project: 'Офис Центр',
      projectId: 2,
      assignee: 'Петров П.П.',
      reporter: 'Сидоров С.С.',
      createdAt: '2024-01-10',
      deadline: '2024-01-20',
      category: 'Отделочные'
    },
    {
      id: 3,
      title: 'Протечка кровли',
      description: 'Обнаружена протечка в торговом зале во время дождя',
      status: 'На проверке',
      priority: 'Высокий',
      project: 'Торговый центр Гранд',
      projectId: 3,
      assignee: 'Козлов К.К.',
      reporter: 'Федоров Ф.Ф.',
      createdAt: '2024-01-08',
      deadline: '2024-01-18',
      category: 'Кровельные'
    },
    {
      id: 4,
      title: 'Неисправность вентиляции',
      description: 'В классе №12 не работает вентиляционная система',
      status: 'Закрыта',
      priority: 'Средний',
      project: 'Школа №25',
      projectId: 4,
      assignee: 'Николаев Н.Н.',
      reporter: 'Морозов М.М.',
      createdAt: '2024-01-05',
      deadline: '2024-01-15',
      category: 'Инженерные системы'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Все');
  const [filterPriority, setFilterPriority] = useState('Все');
  const [filterProject, setFilterProject] = useState('Все');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новая': return 'bg-yellow-100 text-yellow-800';
      case 'В работе': return 'bg-blue-100 text-blue-800';
      case 'На проверке': return 'bg-purple-100 text-purple-800';
      case 'Закрыта': return 'bg-green-100 text-green-800';
      case 'Отменена': return 'bg-red-100 text-red-800';
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

  const isOverdue = (deadline: string, status: string) => {
    if (status === 'Закрыта' || status === 'Отменена') return false;
    return new Date(deadline) < new Date();
  };

  const filteredDefects = defects.filter(defect => {
    const matchesSearch = defect.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         defect.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Все' || defect.status === filterStatus;
    const matchesPriority = filterPriority === 'Все' || defect.priority === filterPriority;
    const matchesProject = filterProject === 'Все' || defect.project === filterProject;
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  const uniqueProjects = Array.from(new Set(defects.map(d => d.project)));

  return (
    <div className="min-h-screen" style={{backgroundColor: '#C4DFE6'}}>
      {/* Заголовок */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Управление дефектами</h1>
              <p className="text-gray-600">Регистрация, отслеживание и контроль дефектов</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/defects/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Добавить дефект
              </Link>
              <Link 
                href="/dashboard"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
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
                  <option value="Все">Все статусы</option>
                  <option value="Новая">Новая</option>
                  <option value="В работе">В работе</option>
                  <option value="На проверке">На проверке</option>
                  <option value="Закрыта">Закрыта</option>
                  <option value="Отменена">Отменена</option>
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
                  <option value="Все">Все приоритеты</option>
                  <option value="Критический">Критический</option>
                  <option value="Высокий">Высокий</option>
                  <option value="Средний">Средний</option>
                  <option value="Низкий">Низкий</option>
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
                  <option value="Все">Все проекты</option>
                  {uniqueProjects.map(project => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('Все');
                    setFilterPriority('Все');
                    setFilterProject('Все');
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-2xl font-bold text-blue-600">{defects.length}</p>
            <p className="text-sm text-gray-600">Всего</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {defects.filter(d => d.status === 'Новая').length}
            </p>
            <p className="text-sm text-gray-600">Новые</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-2xl font-bold text-blue-600">
              {defects.filter(d => d.status === 'В работе').length}
            </p>
            <p className="text-sm text-gray-600">В работе</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-2xl font-bold text-green-600">
              {defects.filter(d => d.status === 'Закрыта').length}
            </p>
            <p className="text-sm text-gray-600">Закрыто</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-2xl font-bold text-red-600">
              {defects.filter(d => isOverdue(d.deadline, d.status)).length}
            </p>
            <p className="text-sm text-gray-600">Просрочено</p>
          </div>
        </div>

        {/* Список дефектов */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Дефекты ({filteredDefects.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredDefects.map((defect) => (
              <div key={defect.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900 mr-3">
                        {defect.title}
                      </h3>
                      {isOverdue(defect.deadline, defect.status) && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 text-xs font-medium rounded-full mr-2">
                          Просрочено
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full mr-2 ${getStatusColor(defect.status)}`}>
                        {defect.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(defect.priority)}`}>
                        {defect.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{defect.description}</p>
                  </div>
                  
                  <div className="ml-6 flex space-x-2">
                    <Link
                      href={`/defects/${defect.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Подробнее
                    </Link>
                    <Link
                      href={`/defects/${defect.id}/edit`}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      Изменить
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Проект:</span>
                    <br />
                    <Link href={`/projects/${defect.projectId}`} className="text-blue-600 hover:text-blue-500">
                      {defect.project}
                    </Link>
                  </div>
                  <div>
                    <span className="font-medium">Исполнитель:</span>
                    <br />
                    <span className={defect.assignee === 'Не назначен' ? 'text-red-600' : 'text-gray-900'}>
                      {defect.assignee}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Срок выполнения:</span>
                    <br />
                    <span className={isOverdue(defect.deadline, defect.status) ? 'text-red-600' : 'text-gray-900'}>
                      {new Date(defect.deadline).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Категория:</span>
                    <br />
                    {defect.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDefects.length === 0 && (
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
  );
}
