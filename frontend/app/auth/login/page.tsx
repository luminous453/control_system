'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Реализация логики авторизации
    console.log('Данные для авторизации:', formData);
    alert('Заглушка: Авторизация в разработке');
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
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-80 transition-opacity"
                style={{backgroundColor: '#07575B'}}
              >
                Войти
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
