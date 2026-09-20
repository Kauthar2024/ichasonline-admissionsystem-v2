import { redirect } from '@tanstack/react-router';
import { ROLE_HOME } from './roles';
import type { Role } from './roles';
import { getSessionUser } from './session';

// Use as a route's `beforeLoad`. Logged-out users go to /login;
// users with the wrong role are sent to their own dashboard.
export function requireRole(...allowed: Role[]) {
  return () => {
    const user = getSessionUser();
    if (!user) throw redirect({ to: '/login' });
    if (!allowed.includes(user.role)) throw redirect({ to: ROLE_HOME[user.role] as any });
  };
}
