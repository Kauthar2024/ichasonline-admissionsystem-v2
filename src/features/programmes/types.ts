export const GRADES = ['A', 'B', 'C', 'D', 'F'] as const;
export type Grade = (typeof GRADES)[number];

// Lower is better (A = 1 ... F = 5), same scale as the education page.
export const GRADE_POINTS: Record<Grade, number> = { A: 1, B: 2, C: 3, D: 4, F: 5 };

export interface Programme {
  id: string;
  name: string;
  // Seats available for the admission cycle.
  quota: number;
  // Entry criteria checked against the applicant's NECTA results.
  requiredSubjects: string[];
  minGrade: Grade;
  active: boolean;
}

export type NewProgramme = Omit<Programme, 'id'>;
