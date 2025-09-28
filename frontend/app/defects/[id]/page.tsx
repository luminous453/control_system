'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function DefectDetailPage() {
  const params = useParams();
  const defectId = params.id;

  // Заглушка данных для конкретного дефекта
  const [defect] = useState({
    id: 1,
    title: 'Трещина в несущей стене',
    description: 'На 3-м этаже обнаружена трещина длиной 2м в несущей стене. Трещина проходит вертикально от потолка до пола. Необходимо провести обследование конструктива и принять меры по усилению.',
    status: 'В работе',
    priority: 'Критический',
    category: 'Конструктивные',
    project: 'ЖК Солнечный',
    projectId: 1,
    assignee: 'Петров П.П.',
    assigneeId: 2,
    reporter: 'Иванов И.И.',
    reporterId: 1,
    createdAt: '2024-01-15T10:30:00',
    updatedAt: '2024-01-18T14:20:00',
    deadline: '2024-01-25',
    location: '3 этаж, квартира 305, гостиная',
    estimatedCost: 150000,
    actualCost: null,
    attachments: [
      { id: 1, name: 'photo_crack_1.jpg', type: 'image', size: '2.5 MB', url: '#' },
      { id: 2, name: 'photo_crack_2.jpg', type: 'image', size: '1.8 MB', url: '#' },
      { id: 3, name: 'structural_report.pdf', type: 'document', size: '850 KB', url: '#' }
    ]
  });

  const [comments] = useState([
    {
      id: 1,
      author: 'Иванов И.И.',
      authorRole: 'Инженер',
      content: 'Дефект обнаружен во время планового обхода. Требует немедленного внимания.',
      createdAt: '2024-01-15T10:35:00',
      isSystem: false
    },
    {
      id: 2,
      author: 'Система',
      authorRole: 'Система',
      content: 'Дефект назначен исполнителю: Петров П.П.',
      createdAt: '2024-01-16T09:15:00',
      isSystem: true
    },
    {
      id: 3,
      author: 'Петров П.П.',
      authorRole: 'Менеджер',
      content: 'Принял в работу. Планирую выезд на объект завтра утром для детального обследования.',
      createdAt: '2024-01-16T11:45:00',
      isSystem: false
    },
    {
      id: 4,
      author: 'Система',
      authorRole: 'Система',
      content: 'Статус изменен с "Новая" на "В работе"',
      createdAt: '2024-01-17T08:20:00',
      isSystem: true
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [newStatus, setNewStatus] = useState(defect.status);

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

  const handleStatusChange = () => {
    // TODO: Реализация изменения статуса
    alert(`Заглушка: Статус изменен на "${newStatus}"`);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // TODO: Реализация добавления комментария
      alert('Заглушка: Комментарий добавлен');
      setNewComment('');
    }
  };

  const isOverdue = new Date(defect.deadline) < new Date() && defect.status !== 'Закрыта' && defect.status !== 'Отменена';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Дефект #{defectId}</h1>
                {isOverdue && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 text-xs font-medium rounded-full">
                    Просрочено
                  </span>
                )}
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(defect.status)}`}>
                  {defect.status}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(defect.priority)}`}>
                  {defect.priority}
                </span>
              </div>
              <p className="text-gray-600">{defect.title}</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href={`/defects/${defectId}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Редактировать
              </Link>
              <Link 
                href="/defects"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                ← К списку дефектов
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная информация */}
          <div className="lg:col-span-2 space-y-6">
            {/* Описание */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Описание дефекта</h2>
              <p className="text-gray-700 leading-relaxed">{defect.description}</p>
            </div>

            {/* Вложения */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Прикрепленные файлы ({defect.attachments.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {defect.attachments.map((attachment) => (
                  <div key={attachment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        attachment.type === 'image' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <span className="text-xs font-semibold">
                          {attachment.type === 'image' ? 'IMG' : 'DOC'}
                        </span>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{attachment.size}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                        Скачать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Комментарии */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                История и комментарии ({comments.length})
              </h2>
              
              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className={`border-l-4 pl-4 py-2 ${
                    comment.isSystem ? 'border-gray-300 bg-gray-50' : 'border-blue-400 bg-blue-50'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">({comment.authorRole})</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString('ru-RU')}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>

              {/* Форма добавления комментария */}
              <form onSubmit={handleCommentSubmit} className="border-t border-gray-200 pt-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Добавить комментарий
                </label>
                <textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите ваш комментарий..."
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Добавить комментарий
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Изменение статуса */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Управление статусом</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Текущий статус
                  </label>
                  <select
                    id="status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Новая">Новая</option>
                    <option value="В работе">В работе</option>
                    <option value="На проверке">На проверке</option>
                    <option value="Закрыта">Закрыта</option>
                    <option value="Отменена">Отменена</option>
                  </select>
                </div>
                {newStatus !== defect.status && (
                  <button
                    onClick={handleStatusChange}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Изменить статус
                  </button>
                )}
              </div>
            </div>

            {/* Детали */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Детали</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Проект:</span>
                  <Link href={`/projects/${defect.projectId}`} className="text-blue-600 hover:text-blue-500">
                    {defect.project}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Категория:</span>
                  <span className="text-gray-900">{defect.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Местоположение:</span>
                  <span className="text-gray-900">{defect.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Исполнитель:</span>
                  <span className="text-gray-900">{defect.assignee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Автор:</span>
                  <span className="text-gray-900">{defect.reporter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Срок выполнения:</span>
                  <span className={isOverdue ? 'text-red-600' : 'text-gray-900'}>
                    {new Date(defect.deadline).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Оценочная стоимость:</span>
                  <span className="text-gray-900">
                    {defect.estimatedCost ? `${defect.estimatedCost.toLocaleString()} ₽` : 'Не указано'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Создан:</span>
                  <span className="text-gray-900">
                    {new Date(defect.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Обновлен:</span>
                  <span className="text-gray-900">
                    {new Date(defect.updatedAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
