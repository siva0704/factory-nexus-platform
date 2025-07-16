export interface User {
  id: string;
  email: string;
  role: 'superadmin' | 'admin' | 'supervisor' | 'employee';
  factory_id?: string;
  factory_name?: string;
  name: string;
  employee_id?: string; // Auto-generated IDs like SFLEMP001, SFLSUVR001
  created_at: string;
  last_login?: string;
}

export interface Factory {
  id: string;
  name: string;
  code: string; // SFL, IBM, etc.
  created_at: string;
  admin_id: string;
  status: 'active' | 'inactive';
}

export interface AuthContextType {
  user: User | null;
  factory: Factory | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
  factory?: Factory;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'supervisor' | 'employee';
  factory_id?: string;
}

export interface CreateFactoryRequest {
  name: string;
  code: string;
  admin_email: string;
  admin_password: string;
  admin_name: string;
}