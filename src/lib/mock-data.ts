import type { SessionUser } from './session';

// Mock data for testing roles while the backend endpoints are not ready.
// Enable with VITE_USE_MOCK=true.
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const MOCK_PASSWORD = 'password123';

export const MOCK_USERS: Record<string, SessionUser> = {
  applicant: { role: 'applicant', username: 'applicant', first_name: 'Amina', last_name: 'Juma', email: 'applicant@test.com' },
  officer: { role: 'admission_officer', username: 'officer', first_name: 'Omar', last_name: 'Hassan', email: 'officer@test.com' },
  admin: { role: 'admin', username: 'admin', first_name: 'Zainab', last_name: 'Ali', email: 'admin@test.com' },
};
