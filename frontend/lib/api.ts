import {
  User,
  Project,
  Defect,
  DefectComment,
  LoginRequest,
  LoginResponse,
  CreateDefectRequest,
  UpdateDefectRequest,
  CreateProjectRequest,
  DefectFilters,
  ProjectFilters,
  DashboardStats,
  APIResponse,
  DefectStatus,
  Role
} from './types';

const API_BASE_URL = 'http://localhost:8000/api';

class APIClient {
  private token: string | null = null;

  constructor() {
    // Получаем токен из localStorage при инициализации
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      // Токен истек или не валиден
      this.clearAuth();
      throw new Error('Необходима аутентификация');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Аутентификация
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    const data = await this.handleResponse<LoginResponse>(response);
    this.token = data.access_token;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  }

  logout(): void {
    this.clearAuth();
  }

  private clearAuth(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  // Дашборд статистика
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/reports/dashboard-stats`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<DashboardStats>(response);
  }

  // Пользователи
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<User[]>(response);
  }

  async getUser(id: number): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<User>(response);
  }

  // Роли
  async getRoles(): Promise<Role[]> {
    const response = await fetch(`${API_BASE_URL}/users/roles`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Role[]>(response);
  }

  // Проекты
  async getProjects(filters?: ProjectFilters): Promise<Project[]> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.executor_id) params.append('executor_id', filters.executor_id.toString());

    const queryString = params.toString();
    const url = `${API_BASE_URL}/projects/${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Project[]>(response);
  }

  async getProject(id: number): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Project>(response);
  }

  async createProject(project: CreateProjectRequest): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(project),
    });
    return this.handleResponse<Project>(response);
  }

  // Статусы дефектов
  async getDefectStatuses(): Promise<DefectStatus[]> {
    const response = await fetch(`${API_BASE_URL}/defects/statuses`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<DefectStatus[]>(response);
  }

  // Дефекты
  async getDefects(filters?: DefectFilters): Promise<Defect[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority.toString());
    if (filters?.project_id) params.append('project_id', filters.project_id.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.reporter_id) params.append('reporter_id', filters.reporter_id.toString());
    if (filters?.executor_id) params.append('executor_id', filters.executor_id.toString());

    const queryString = params.toString();
    const url = `${API_BASE_URL}/defects/${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Defect[]>(response);
  }

  async getDefect(id: number): Promise<Defect> {
    const response = await fetch(`${API_BASE_URL}/defects/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Defect>(response);
  }

  async createDefect(defect: CreateDefectRequest): Promise<Defect> {
    const response = await fetch(`${API_BASE_URL}/defects/`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(defect),
    });
    return this.handleResponse<Defect>(response);
  }

  async updateDefect(id: number, defect: UpdateDefectRequest): Promise<Defect> {
    const response = await fetch(`${API_BASE_URL}/defects/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(defect),
    });
    return this.handleResponse<Defect>(response);
  }

  async deleteDefect(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/defects/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  // Комментарии к дефектам
  async getDefectComments(defectId: number): Promise<DefectComment[]> {
    const response = await fetch(`${API_BASE_URL}/defects/${defectId}/comments`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<DefectComment[]>(response);
  }

  async addDefectComment(defectId: number, comment: string): Promise<DefectComment> {
    const response = await fetch(`${API_BASE_URL}/defects/${defectId}/comments`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ comment }),
    });
    return this.handleResponse<DefectComment>(response);
  }

  // Последние дефекты для дашборда
  async getRecentDefects(limit: number = 5): Promise<Defect[]> {
    const response = await fetch(`${API_BASE_URL}/defects/recent?limit=${limit}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Defect[]>(response);
  }

  // Проверка состояния аутентификации
  isAuthenticated(): boolean {
    return !!this.token;
  }
}

// Экспортируем единый экземпляр
export const apiClient = new APIClient();
export default apiClient;
