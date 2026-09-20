import type { Role } from '@/lib/roles';

export interface ManagedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  active: boolean;
  createdAt: string;
}

// Applicants register themselves; admins only create staff accounts.
export type StaffRole = Exclude<Role, 'applicant'>;

export interface NewStaffUser {
  firstName: string;
  lastName: string;
  email: string;
  role: StaffRole;
}

export interface UsersSearch {
  role?: Role;
  q?: string;
}
