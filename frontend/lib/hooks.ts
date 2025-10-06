import { useState, useEffect } from 'react';
import { apiClient } from './api';
import {
  User,
  Project,
  Defect,
  DefectStatus,
  Role,
  DashboardStats,
  DefectFilters,
  ProjectFilters
} from './types';

// Хук для управления состоянием загрузки
export function useAsync<T>(asyncFunction: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    setLoading(true);
    setError(null);
    
    asyncFunction()
      .then(result => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || 'Произошла ошибка');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error, refetch: () => {
    setLoading(true);
    setError(null);
    asyncFunction()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }};
}

// Хук для дашборда статистики
export function useDashboardStats() {
  return useAsync(() => apiClient.getDashboardStats());
}

// Хук для получения проектов
export function useProjects(filters?: ProjectFilters) {
  return useAsync(() => apiClient.getProjects(filters), [filters]);
}

// Хук для получения дефектов
export function useDefects(filters?: DefectFilters) {
  return useAsync(() => apiClient.getDefects(filters), [filters]);
}

// Хук для получения последних дефектов
export function useRecentDefects(limit: number = 5) {
  return useAsync(() => apiClient.getRecentDefects(limit), [limit]);
}

// Хук для получения пользователей
export function useUsers() {
  return useAsync(() => apiClient.getUsers());
}

// Хук для получения ролей
export function useRoles() {
  return useAsync(() => apiClient.getRoles());
}

// Хук для получения статусов дефектов
export function useDefectStatuses() {
  return useAsync(() => apiClient.getDefectStatuses());
}

// Хук для получения текущего пользователя
export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = apiClient.getCurrentUser();
    setUser(currentUser);
  }, []);

  return user;
}

// Хук для проверки аутентификации
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const authenticated = apiClient.isAuthenticated();
    const currentUser = apiClient.getCurrentUser();
    
    setIsAuthenticated(authenticated);
    setUser(currentUser);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password });
      setIsAuthenticated(true);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiClient.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout
  };
}
