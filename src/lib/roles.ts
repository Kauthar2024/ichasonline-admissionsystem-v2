export const ROLES = ['applicant', 'admission_officer', 'admin'] as const;

// Values match the backend enum (ADMISSION_OFFICER = "admission_officer", ...)
export type Role = (typeof ROLES)[number];

export const ROLE_LABEL: Record<Role, string> = {
  applicant: 'Applicant',
  admission_officer: 'Admission Officer',
  admin: 'Admin',
};

export const ROLE_HOME: Record<Role, string> = {
  applicant: '/dashboard',
  admission_officer: '/officer',
  admin: '/admin',
};

export function isRole(value: unknown): value is Role {
  return typeof value === 'string' && (ROLES as readonly string[]).includes(value);
}
