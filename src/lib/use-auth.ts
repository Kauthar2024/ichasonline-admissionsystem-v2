import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, fetchUserProfile } from './auth-api';
import type { LoginCredentials, AuthResponse } from './auth-api';
import { registerUser } from './auth-api';
import type { RegisterCredentials, RegisterResponse } from './auth-api';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUserProfile,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
    retry: false,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => registerUser(credentials),
  });
};