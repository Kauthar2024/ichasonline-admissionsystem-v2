import type { SessionUser } from './session';

// Mock data for testing roles while the backend endpoints are not ready.
// Enable with VITE_USE_MOCK=true.
export const USE_MOCK = import.meta.env?.VITE_USE_MOCK === 'true';

export const MOCK_PASSWORD = 'password123';

export const MOCK_USERS: Record<string, SessionUser> = {
  applicant: { role: 'applicant', username: 'applicant', first_name: 'Amina', last_name: 'Juma', email: 'applicant@test.com' },
  officer: { role: 'admission_officer', username: 'officer', first_name: 'Omar', last_name: 'Hassan', email: 'officer@test.com' },
  admin: { role: 'admin', username: 'admin', first_name: 'Zainab', last_name: 'Ali', email: 'admin@test.com' },
};

export type ApplicationStatus = 'submitted_paid' | 'verified' | 'rejected' | 'queried';

export interface MockApplication {
  ref: string;
  applicant: string;
  programme: string;
  status: ApplicationStatus;
  submitted: string;
}

export const MOCK_APPLICATIONS: MockApplication[] = [
  { ref: 'APP-2026-0001', applicant: 'Amina Juma', programme: 'Diploma in Nursing and Midwifery', status: 'submitted_paid', submitted: '2026-09-12' },
  { ref: 'APP-2026-0002', applicant: 'Hamad Khamis', programme: 'Diploma in Clinical Medicine', status: 'submitted_paid', submitted: '2026-09-12' },
  { ref: 'APP-2026-0003', applicant: 'Fatma Said', programme: 'Diploma in Pharmacy', status: 'verified', submitted: '2026-09-11' },
  { ref: 'APP-2026-0004', applicant: 'Salim Omar', programme: 'Diploma in Nursing and Midwifery', status: 'queried', submitted: '2026-09-10' },
  { ref: 'APP-2026-0005', applicant: 'Mwanaisha Ali', programme: 'Diploma in Medical Laboratory', status: 'rejected', submitted: '2026-09-09' },
];

export const MOCK_ADMIN_OVERVIEW = {
  totalUsers: 128,
  officers: 4,
  programmes: 6,
  applications: MOCK_APPLICATIONS.length,
};
