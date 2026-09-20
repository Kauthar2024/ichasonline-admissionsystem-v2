import { api } from './axios';
import { MOCK_PASSWORD, MOCK_USERS, USE_MOCK } from './mock-data';
import { getSessionUser } from './session';

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
  education_authority : string;
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
  if (USE_MOCK) {
    const user = MOCK_USERS[(credentials.username ?? '').trim().toLowerCase()];
    if (!user || credentials.password !== MOCK_PASSWORD) {
      throw { response: { data: { detail: 'Invalid username or password' } } };
    }
    return { access: `mock-${user.username}`, refresh: 'mock-refresh', user: { ...user } };
  }
  const response = await api.post<AuthResponse>('/auth/login/', credentials);
  return response.data;
};

export const fetchUserProfile = async () => {
  if (USE_MOCK) {
    const user = getSessionUser();
    if (user) return user;
    throw new Error('Not signed in');
  }
  const response = await api.get('/auth/user/');
  return response.data;
};