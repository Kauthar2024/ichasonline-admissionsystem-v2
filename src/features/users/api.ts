import { apiError } from '@/lib/api-error';
import { api } from '@/lib/axios';
import { USE_MOCK } from '@/lib/mock-data';
import { createMockCollection } from '@/lib/mock-store';
import type { ManagedUser, NewStaffUser } from './types';

// Backed by `/api/users/` (admin only), or by the mock store when
// VITE_USE_MOCK=true.
const user = (id: string, firstName: string, lastName: string, role: ManagedUser['role'], email = `${firstName}.${lastName}@example.com`.toLowerCase()): ManagedUser =>
  ({ id, firstName, lastName, email, role, active: true, createdAt: '2026-08-01' });

const db = createMockCollection<ManagedUser>('users', () => [
  user('u1', 'Zainab', 'Ali', 'admin', 'admin@test.com'),
  user('u2', 'Omar', 'Hassan', 'admission_officer', 'officer@test.com'),
  user('u3', 'Rehema', 'Khamis', 'admission_officer'),
  user('u4', 'Amina', 'Juma', 'applicant', 'applicant@test.com'),
  user('u5', 'Hamad', 'Khamis', 'applicant'),
  user('u6', 'Fatma', 'Said', 'applicant'),
  user('u7', 'Salim', 'Omar', 'applicant'),
  user('u8', 'Mwanaisha', 'Ali', 'applicant'),
]);

export const fetchUsers = async (): Promise<ManagedUser[]> => {
  if (USE_MOCK) return db.all();
  try {
    const { data } = await api.get<ManagedUser[]>('/users/');
    return data;
  } catch (error) {
    throw apiError(error, 'Could not load users');
  }
};

export const createStaffUser = async (input: NewStaffUser): Promise<ManagedUser> => {
  if (USE_MOCK) {
    const email = input.email.trim().toLowerCase();
    if (db.all().some((u) => u.email === email)) throw new Error('A user with this email already exists');
    const created: ManagedUser = {
      id: `u${Date.now()}`,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email,
      role: input.role,
      active: true,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    db.save([...db.all(), created]);
    return created;
  }
  try {
    const { data } = await api.post<ManagedUser>('/users/', input);
    return data;
  } catch (error) {
    throw apiError(error, 'Could not create the user');
  }
};

export const setUserActive = async (id: string, active: boolean): Promise<ManagedUser> => {
  if (USE_MOCK) {
    const items = db.all();
    const current = items.find((u) => u.id === id);
    if (!current) throw new Error('User not found');
    const updated = { ...current, active };
    db.save(items.map((u) => (u.id === id ? updated : u)));
    return updated;
  }
  try {
    const { data } = await api.patch<ManagedUser>(`/users/${id}/`, { active });
    return data;
  } catch (error) {
    throw apiError(error, 'Could not update the user');
  }
};
