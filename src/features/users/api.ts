import { createMockCollection } from '@/lib/mock-store';
import type { ManagedUser, NewStaffUser } from './types';

// No backend endpoint yet: backed by the mock store.
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

export const fetchUsers = async (): Promise<ManagedUser[]> => db.all();

export const createStaffUser = async (input: NewStaffUser): Promise<ManagedUser> => {
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
};

export const setUserActive = async (id: string, active: boolean): Promise<ManagedUser> => {
  const items = db.all();
  const current = items.find((u) => u.id === id);
  if (!current) throw new Error('User not found');
  const updated = { ...current, active };
  db.save(items.map((u) => (u.id === id ? updated : u)));
  return updated;
};
