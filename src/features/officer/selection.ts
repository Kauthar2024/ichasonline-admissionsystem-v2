import type { Programme } from '@/features/programmes';
import { checkNecta } from './necta';
import type { Application } from './types';

export type Outcome = 'admitted' | 'selected' | 'waitlisted';

export interface SelectionRow {
  app: Application;
  points: number;
  outcome: Outcome;
}

export interface ProgrammeSelection {
  programme: Programme;
  admittedCount: number;
  rows: SelectionRow[];
}

// Ranks verified candidates per programme (best points first, then earliest
// submission) and fills the seats left after already-admitted candidates.
export function computeSelection(applications: Application[], programmes: Programme[]): ProgrammeSelection[] {
  return programmes.map((programme) => {
    const choosing = applications.filter((a) => a.firstChoice === programme.id);
    const admitted = choosing.filter((a) => a.status === 'admitted');
    const seatsLeft = Math.max(0, programme.quota - admitted.length);

    const pending = choosing
      .filter((a) => a.status === 'verified')
      .map((app) => ({ app, points: checkNecta(app, programme).points }))
      .sort((a, b) => a.points - b.points || a.app.submittedAt.localeCompare(b.app.submittedAt));

    return {
      programme,
      admittedCount: admitted.length,
      rows: [
        ...admitted.map((app): SelectionRow => ({ app, points: checkNecta(app, programme).points, outcome: 'admitted' })),
        ...pending.map((p, i): SelectionRow => ({ ...p, outcome: i < seatsLeft ? 'selected' : 'waitlisted' })),
      ],
    };
  });
}
