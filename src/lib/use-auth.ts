import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { loginUser, fetchUserProfile } from './auth-api';
import type { AuthResponse, LoginCredentials } from './auth-api';
import { registerUser } from './auth-api';
import type { RegisterCredentials } from './auth-api';
import { isRole } from './roles';
import type { Role } from './roles';
import { clearSession, getAccessToken, setSession } from './session';
import type { SessionUser } from './session';

// Reads the payload of a JWT without verifying it (display/routing only;
// the backend still enforces real permissions).
function decodeJwt(token: string): Record<string, unknown> {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload));
  } catch {
    return {};
  }
}

// Works out who just logged in. The backend has no /auth/user/ yet, so
// look for a role in the login response, then in the token, then try the
// profile endpoint. If none provides one, treat the account as an
// applicant (the only role the backend can create today).
async function resolveSessionUser(data: AuthResponse): Promise<SessionUser> {
  const claims = decodeJwt(data.access);
  let source: Record<string, unknown> = { ...claims, ...data.user };

  if (!isRole(source.role)) {
    try {
      source = { ...source, ...(await fetchUserProfile()) };
    } catch {
      // profile endpoint not available; fall through to the default role
    }
  }

  return { ...source, role: isRole(source.role) ? source.role : 'applicant' } as SessionUser;
}

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<Role> => {
      const data = await loginUser(credentials);
      // Store the token first so the profile request is authenticated.
      localStorage.setItem('access_token', data.access);

      const user = await resolveSessionUser(data);
      setSession({ access: data.access, refresh: data.refresh }, user);
      return user.role;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    clearSession();
    queryClient.clear();
    navigate({ to: '/login' });
  };
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUserProfile,
    enabled: typeof window !== 'undefined' && !!getAccessToken(),
    retry: false,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => registerUser(credentials),
  });
};
