import type { Grade } from '@/features/programmes';
import type { Application, ApplicationStatus, Decision, Subject } from './types';

const subjects = (bio: Grade, chem: Grade, phys: Grade, eng: Grade, math: Grade): Subject[] => [
  { name: 'Biology', grade: bio },
  { name: 'Chemistry', grade: chem },
  { name: 'Physics', grade: phys },
  { name: 'English', grade: eng },
  { name: 'Mathematics', grade: math },
];

const documents = (ref: string) => [
  { id: `${ref}-cert`, name: 'Form IV Certificate', format: 'PDF' as const, sizeKb: 812 },
  { id: `${ref}-transcript`, name: 'Academic Transcript', format: 'PDF' as const, sizeKb: 640 },
  { id: `${ref}-photo`, name: 'Passport Photo', format: 'JPEG' as const, sizeKb: 210 },
];

const decision = (status: Decision['status'], comment: string, reasonCode?: Decision['reasonCode']): Decision => ({
  status,
  comment,
  reasonCode,
  officer: 'Omar Hassan',
  at: '2026-09-13T09:30:00.000Z',
});

interface Row {
  n: number;
  first: string;
  last: string;
  choices: [string, string];
  subjects: Subject[];
  status: ApplicationStatus;
  submittedAt: string;
  health?: boolean;
  decisions?: Decision[];
}

const ROWS: Row[] = [
  { n: 1, first: 'Amina', last: 'Juma', choices: ['nursing', 'pharmacy'], subjects: subjects('B', 'C', 'C', 'C', 'D'), status: 'submitted_paid', submittedAt: '2026-09-12' },
  { n: 2, first: 'Hamad', last: 'Khamis', choices: ['clinical-medicine', 'pharmacy'], subjects: subjects('A', 'B', 'B', 'B', 'C'), status: 'submitted_paid', submittedAt: '2026-09-12' },
  { n: 3, first: 'Fatma', last: 'Said', choices: ['pharmacy', 'nursing'], subjects: subjects('B', 'B', 'C', 'B', 'C'), status: 'verified', submittedAt: '2026-09-11', decisions: [decision('verified', 'All documents authentic.')] },
  { n: 4, first: 'Salim', last: 'Omar', choices: ['nursing', 'medical-laboratory'], subjects: subjects('C', 'D', 'D', 'C', 'D'), status: 'queried', submittedAt: '2026-09-10', decisions: [decision('queried', 'Chemistry grade is below the nursing requirement. Please confirm your second choice.')] },
  { n: 5, first: 'Mwanaisha', last: 'Ali', choices: ['medical-laboratory', 'environmental-health'], subjects: subjects('F', 'D', 'D', 'C', 'D'), status: 'rejected', submittedAt: '2026-09-09', decisions: [decision('rejected', 'Biology failed.', 'INSUFFICIENT_GRADES')] },
  { n: 6, first: 'Juma', last: 'Haji', choices: ['nursing', 'pharmacy'], subjects: subjects('A', 'B', 'B', 'B', 'C'), status: 'verified', submittedAt: '2026-09-08', decisions: [decision('verified', 'Eligible.')] },
  { n: 7, first: 'Zuhura', last: 'Mussa', choices: ['nursing', 'pharmacy'], subjects: subjects('B', 'B', 'C', 'B', 'C'), status: 'verified', submittedAt: '2026-09-08', decisions: [decision('verified', 'Eligible.')] },
  { n: 8, first: 'Ali', last: 'Bakari', choices: ['nursing', 'medical-laboratory'], subjects: subjects('B', 'C', 'C', 'C', 'D'), status: 'verified', submittedAt: '2026-09-09', decisions: [decision('verified', 'Eligible.')] },
  { n: 9, first: 'Khadija', last: 'Rashid', choices: ['nursing', 'pharmacy'], subjects: subjects('C', 'C', 'D', 'C', 'D'), status: 'verified', submittedAt: '2026-09-10', decisions: [decision('verified', 'Eligible.')] },
  { n: 10, first: 'Yussuf', last: 'Suleiman', choices: ['clinical-medicine', 'pharmacy'], subjects: subjects('B', 'B', 'C', 'B', 'C'), status: 'verified', submittedAt: '2026-09-09', decisions: [decision('verified', 'Eligible.')] },
  { n: 11, first: 'Neema', last: 'Peter', choices: ['pharmacy', 'nursing'], subjects: subjects('C', 'F', 'D', 'C', 'D'), status: 'submitted_paid', submittedAt: '2026-09-13' },
  { n: 12, first: 'Rashid', last: 'Nassor', choices: ['radiology', 'clinical-medicine'], subjects: subjects('C', 'C', 'B', 'C', 'C'), status: 'submitted_paid', submittedAt: '2026-09-13', health: false },
];

export const seedApplications = (): Application[] =>
  ROWS.map((r) => {
    const ref = `APP-2026-${String(r.n).padStart(4, '0')}`;
    const docs = documents(ref);
    return {
      ref,
      firstName: r.first,
      lastName: r.last,
      email: `${r.first}.${r.last}@example.com`.toLowerCase(),
      phone: `+25577${String(1000000 + r.n * 7919).slice(0, 7)}`,
      nectaIndex: `S${String(1000 + r.n).padStart(4, '0')}/0001/2024`,
      firstChoice: r.choices[0],
      secondChoice: r.choices[1],
      subjects: r.subjects,
      documents: docs,
      healthQualified: r.health ?? true,
      status: r.status,
      submittedAt: r.submittedAt,
      verifiedDocuments: r.status === 'verified' ? docs.map((d) => d.id) : [],
      decisions: r.decisions ?? [],
    };
  });
