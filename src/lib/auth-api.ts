import { api } from './axios';

export interface LoginCredentials {
  username?: string;
  email?: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user?: Record<string, unknown>;
}

export interface RegisterCredentials {
  index_number: string;
  equivalent_number?: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

export interface RegisterResponse {
  message?: string;
  id?: string | number;
  email?: string;
}


export const registerUser = async (data: RegisterCredentials): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register/', data);
  return response.data;
};
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login/', credentials);
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await api.get('/auth/user/');
  return response.data;
};