import type { Grade } from '@/features/programmes';
import type { ApplicationStatus } from '@/features/officer';

// An applicant's own application. `draft` is applicant-only — it never reaches
// the officer's queue, so it is not part of APPLICATION_STATUSES.
export type ApplicantStatus = ApplicationStatus | 'draft';

export interface DraftSubject {
  name: string;
  grade: Grade;
}

export interface DraftDocument {
  id: string;
  name: string;
  format: 'PDF' | 'JPEG' | 'PNG';
  sizeKb: number;
  url: string | null;
}

export interface ApplicationDecision {
  status: 'verified' | 'rejected' | 'queried';
  reasonCode?: string;
  comment: string;
  officer: string;
  at: string;
}

export interface AdmissionLetter {
  token: string;
  generatedAt: string | null;
}

export interface MyApplication {
  ref: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nectaIndex: string;
  examYear: number | null;
  firstChoice: string;
  secondChoice: string;
  subjects: DraftSubject[];
  documents: DraftDocument[];
  healthQualified: boolean;
  status: ApplicantStatus;
  submittedAt: string | null;
  resubmittedAt: string | null;
  // The officer's review trail and, once selected, the admission letter.
  decisions: ApplicationDecision[];
  letter: AdmissionLetter | null;
}

// Every field is optional: each wizard step saves only what it collected.
export interface DraftPatch {
  nectaIndex?: string;
  examYear?: number | null;
  firstChoice?: string;
  secondChoice?: string;
  healthQualified?: boolean;
  subjects?: DraftSubject[];
}

export const isDraft = (application: MyApplication | null | undefined) =>
  application?.status === 'draft';

// A query is the admissions office asking for a correction, so it reopens the
// application for editing and resubmission (mirrors EDITABLE_STATUSES server-side).
export const isEditable = (application: MyApplication | null | undefined) =>
  application?.status === 'draft' || application?.status === 'queried';

export const isQueried = (application: MyApplication | null | undefined) =>
  application?.status === 'queried';
