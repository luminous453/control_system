'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../lib/hooks';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Перенаправляем авторизованных пользователей
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Очищаем ошибку при изменении полей
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{backgroundColor: '#C4DFE6'}}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold" style={{color: '#003B46'}}>
          Вход в систему
        </h2>
        <p className="mt-2 text-center text-sm" style={{color: '#07575B'}}>
          Система управления дефектами строительных объектов
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {/* Тестовые аккаунты */}
          <div className="mb-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Тестовые аккаунты:</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p>• engineer1@example.com (Инженер)</p>
              <p>• manager1@example.com (Менеджер)</p>
              <p>• director@example.com (Руководитель)</p>
              <p className="font-medium">Пароль: password123</p>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium" style={{color: '#003B46'}}>
                Email адрес
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border rounded-md sm:text-sm focus:outline-none"
                  style={{borderColor: '#66A5AD', backgroundColor: '#C4DFE6'}}
                  placeholder="Введите ваш email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium" style={{color: '#003B46'}}>
                Пароль
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border rounded-md sm:text-sm focus:outline-none"
                  style={{borderColor: '#66A5AD', backgroundColor: '#C4DFE6'}}
                  placeholder="Введите пароль"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border"
                  style={{accentColor: '#07575B'}}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm" style={{color: '#003B46'}}>
                  Запомнить меня
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium hover:opacity-80" style={{color: '#07575B'}}>
                  Забыли пароль?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{backgroundColor: '#07575B'}}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Вход...
                  </>
                ) : (
                  'Войти'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{borderColor: '#66A5AD'}} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white" style={{color: '#07575B'}}>или</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/auth/register" className="font-medium hover:opacity-80" style={{color: '#07575B'}}>
                Зарегистрироваться
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm hover:opacity-80" style={{color: '#07575B'}}>
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
