'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Image from 'next/image';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  
  // Страницы, где не нужно показывать навигацию
  const publicPages = ['/', '/auth/login', '/auth/register'];
  const isPublicPage = publicPages.includes(pathname);

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#C4DFE6'}}>
      <Navigation />
      <main>
        {children}
      </main>
      
      {/* Футер */}
      <footer className="border-t border-gray-200 mt-auto" style={{backgroundColor: '#66A5AD'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo-new.png"
                alt="СистемаКонтроля"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <div>
                <p className="text-lg font-medium" style={{color: '#003B46'}}>СистемаКонтроля</p>
                <p className="text-sm" style={{color: '#07575B'}}>Управление дефектами строительных объектов</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
