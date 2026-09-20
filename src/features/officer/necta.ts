import { GRADE_POINTS } from '@/features/programmes';
import type { Grade, Programme } from '@/features/programmes';
import type { Application } from './types';

export interface NectaRow {
  subject: string;
  required: Grade; // worst grade accepted
  grade: Grade | null; // null = subject missing from the results
  pass: boolean;
}

export interface NectaCheck {
  rows: NectaRow[];
  // Sum of grade points over the required subjects. Lower ranks higher.
  points: number;
  eligible: boolean;
}

// Automated NECTA grade check against a programme's entry criteria.
// (Stands in for the NECTA database lookup until the backend provides it.)
export function checkNecta(app: Application, programme: Programme | undefined): NectaCheck {
  if (!programme) return { rows: [], points: Infinity, eligible: false };

  const rows = programme.requiredSubjects.map((subject): NectaRow => {
    const grade = app.subjects.find((s) => s.name.toLowerCase() === subject.toLowerCase())?.grade ?? null;
    return {
      subject,
      required: programme.minGrade,
      grade,
      pass: grade !== null && GRADE_POINTS[grade] <= GRADE_POINTS[programme.minGrade],
    };
  });

  return {
    rows,
    points: rows.reduce((sum, r) => sum + (r.grade ? GRADE_POINTS[r.grade] : GRADE_POINTS.F), 0),
    eligible: rows.every((r) => r.pass),
  };
}
