// Типы данных для системы управления дефектами

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  role_id: number;
  role?: Role;
  created_at: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  default_executor_id?: number;
  default_executor?: User;
  created_at: string;
  defects?: Defect[];
}

export interface DefectStatus {
  id: number;
  name: string;
}

export interface Defect {
  id: number;
  description: string;
  project_id: number;
  project?: Project;
  reporter_id: number;
  reporter?: User;
  executor_id?: number;
  executor?: User;
  status_id: number;
  status?: DefectStatus;
  priority: number; // 1-низкий, 2-средний, 3-высокий
  deadline?: string;
  created_at: string;
  updated_at: string;
  comments?: DefectComment[];
  attachments?: DefectAttachment[];
}

export interface DefectComment {
  id: number;
  defect_id: number;
  user_id: number;
  user?: User;
  comment: string;
  created_at: string;
}

export interface DefectAttachment {
  id: number;
  defect_id: number;
  file_path: string;
  original_name: string;
  uploaded_at: string;
}

// API Response типы
export interface APIResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface CreateDefectRequest {
  description: string;
  project_id: number;
  executor_id?: number;
  priority: number;
  deadline?: string;
}

export interface UpdateDefectRequest {
  description?: string;
  executor_id?: number;
  status_id?: number;
  priority?: number;
  deadline?: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  default_executor_id?: number;
}

export interface DefectFilters {
  status?: string;
  priority?: number;
  project_id?: number;
  search?: string;
  reporter_id?: number;
  executor_id?: number;
}

export interface ProjectFilters {
  search?: string;
  executor_id?: number;
}

// Статистика для дашборда
export interface DashboardStats {
  total_defects: number;
  new_defects: number;
  in_progress_defects: number;
  completed_defects: number;
  active_projects: number;
  overdue_defects: number;
}

// Константы для приоритетов
export const PRIORITY_LABELS = {
  1: 'Низкий',
  2: 'Средний', 
  3: 'Высокий'
} as const;

export const PRIORITY_COLORS = {
  1: { bg: '#C4DFE6', text: '#003B46' },
  2: { bg: '#66A5AD', text: 'white' },
  3: { bg: '#FF8800', text: 'white' }
} as const;

// Роли пользователей
export const USER_ROLES = {
  ENGINEER: 'Инженер',
  MANAGER: 'Менеджер', 
  SUPERVISOR: 'Руководитель'
} as const;
