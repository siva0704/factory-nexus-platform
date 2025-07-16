import { LoginResponse, CreateUserRequest, CreateFactoryRequest, User, Factory } from '@/types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  }

  async getFactories(): Promise<Factory[]> {
    const response = await fetch(`${API_BASE_URL}/factories`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch factories');
    }

    return response.json();
  }

  async createFactory(data: CreateFactoryRequest): Promise<Factory> {
    const response = await fetch(`${API_BASE_URL}/factories`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create factory');
    }

    return response.json();
  }

  async getFactoryUsers(factoryId: string): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/factory/${factoryId}/users`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch factory users');
    }

    return response.json();
  }

  async createFactoryUser(factoryId: string, data: CreateUserRequest): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/factory/${factoryId}/users`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create user');
    }

    return response.json();
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user');
    }

    return response.json();
  }

  async deleteUser(userId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete user');
    }
  }
}

export const api = new ApiClient();