import type { Grade } from '@/features/programmes';

export const APPLICATION_STATUSES = ['submitted_paid', 'verified', 'rejected', 'queried', 'admitted'] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_META: Record<ApplicationStatus, { label: string; cls: string }> = {
  submitted_paid: { label: 'Submitted & Paid', cls: 'bg-yellow-100 text-yellow-800' },
  verified: { label: 'Verified & Eligible', cls: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-800' },
  queried: { label: 'Queried', cls: 'bg-blue-100 text-blue-800' },
  admitted: { label: 'Admitted', cls: 'bg-purple-100 text-purple-800' },
};

// Statuses the officer can still act on (PRO004 pre-condition: submitted & paid).
export const isReviewable = (s: ApplicationStatus) => s === 'submitted_paid' || s === 'queried';

// A rejection must always carry one of these codes (PRO004 business rule).
export const REJECTION_REASONS = [
  { code: 'INSUFFICIENT_GRADES', label: 'Does not meet programme entry grades' },
  { code: 'NECTA_MISMATCH', label: 'Results do not match NECTA records' },
  { code: 'INVALID_DOCUMENTS', label: 'Documents unclear or not authentic' },
  { code: 'MISSING_HEALTH_QUALIFICATION', label: 'Mandatory health qualification not met' },
  { code: 'DUPLICATE_APPLICATION', label: 'Duplicate application' },
  { code: 'OTHER', label: 'Other (explain in comments)' },
] as const;
export type RejectionCode = (typeof REJECTION_REASONS)[number]['code'];

export interface Subject {
  name: string;
  grade: Grade;
}

export interface ApplicationDocument {
  id: string;
  name: string;
  format: 'PDF' | 'JPEG' | 'PNG';
  sizeKb: number;
}

export type DecisionStatus = Extract<ApplicationStatus, 'verified' | 'rejected' | 'queried'>;

export interface Decision {
  status: DecisionStatus;
  reasonCode?: RejectionCode;
  comment: string;
  officer: string;
  at: string;
}

export interface AdmissionLetter {
  token: string;
  generatedAt: string;
}

export interface Application {
  ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nectaIndex: string;
  firstChoice: string; // programme id
  secondChoice: string; // programme id
  subjects: Subject[];
  documents: ApplicationDocument[];
  healthQualified: boolean;
  status: ApplicationStatus;
  submittedAt: string;
  // ids of documents the officer confirmed as authentic
  verifiedDocuments: string[];
  decisions: Decision[];
  letter?: AdmissionLetter;
}

export interface AppNotification {
  id: string;
  ref: string;
  applicant: string;
  channel: 'SMS' | 'Email';
  message: string;
  at: string;
}

export interface ApplicationsSearch {
  status?: ApplicationStatus;
  programme?: string;
  q?: string;
}

export interface DecisionInput {
  ref: string;
  status: DecisionStatus;
  reasonCode?: RejectionCode;
  comment: string;
  verifiedDocuments: string[];
}
