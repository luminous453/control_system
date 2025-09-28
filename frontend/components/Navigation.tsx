'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Заглушка для определения текущего пользователя
  const user = {
    name: 'Иван Петров',
    role: 'manager',
    avatar: null
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'engineer': return 'Инженер';
      case 'manager': return 'Менеджер';
      case 'observer': return 'Руководитель';
      default: return 'Пользователь';
    }
  };

  const navigationItems = [
    {
      name: 'Главная',
      href: '/dashboard',
      icon: '',
      roles: ['engineer', 'manager', 'observer']
    },
    {
      name: 'Дефекты',
      href: '/defects',
      icon: '',
      roles: ['engineer', 'manager', 'observer']
    },
    {
      name: 'Проекты',
      href: '/projects',
      icon: '',
      roles: ['manager', 'observer']
    },
    {
      name: 'Отчеты',
      href: '/reports',
      icon: '',
      roles: ['manager', 'observer']
    },
    {
      name: 'Аналитика',
      href: '/analytics',
      icon: '',
      roles: ['manager', 'observer']
    }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200" style={{backgroundColor: '#C4DFE6'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Логотип */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <Image
                  src="/logo-new.png"
                  alt="СистемаКонтроля"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="hidden sm:block text-xl font-bold" style={{color: '#003B46'}}>
                  СистемаКонтроля
                </span>
              </Link>
            </div>

            {/* Навигационные ссылки для десктопа */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-white border-white'
                      : 'border-transparent hover:border-white'
                  }`}
                  style={{
                    color: isActive(item.href) ? '#003B46' : '#07575B',
                    borderColor: isActive(item.href) ? '#07575B' : 'transparent'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Правая часть навигации */}
          <div className="flex items-center space-x-4">
            {/* Профиль пользователя */}
            <div className="flex items-center space-x-8">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium" style={{color: '#003B46'}}>{user.name}</p>
                <p className="text-xs" style={{color: '#07575B'}}>{getRoleDisplayName(user.role)}</p>
              </div>

              <Link
                href="/auth/login"
                className="hidden md:block text-sm transition-colors hover:opacity-80"
                style={{color: '#07575B'}}
              >
                Выход
              </Link>
            </div>

            {/* Мобильное меню */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Открыть меню</span>
                <div className="w-6 h-6">
                  {isMobileMenuOpen ? (
                    <span className="text-lg">✕</span>
                  ) : (
                    <span className="text-lg">☰</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200" style={{backgroundColor: '#66A5AD'}}>
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex items-center px-3 py-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-gray-700">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{getRoleDisplayName(user.role)}</p>
                </div>
              </div>
              
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Выход
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
