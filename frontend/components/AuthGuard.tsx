'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/hooks';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Небольшая задержка для проверки токена
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, router]);

  if (loading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#C4DFE6'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p style={{color: '#003B46'}}>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return <>{children}</>;
}
