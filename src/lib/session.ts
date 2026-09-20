import { isRole } from './roles';
import type { Role } from './roles';

// Route guards run outside React, so the session lives in localStorage
// and is read synchronously.
const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const USER_KEY = 'auth_user';

export interface SessionUser {
  role: Role;
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
}

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);

export function getSessionUser(): SessionUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw || !getAccessToken()) return null;
    const user = JSON.parse(raw);
    return isRole(user?.role) ? (user as SessionUser) : null;
  } catch {
    return null;
  }
}

export function setSession(tokens: { access: string; refresh?: string }, user: SessionUser) {
  localStorage.setItem(ACCESS_KEY, tokens.access);
  if (tokens.refresh) localStorage.setItem(REFRESH_KEY, tokens.refresh);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}
