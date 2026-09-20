import { createMockCollection } from '@/lib/mock-store';
import type { NewProgramme, Programme } from './types';

// No backend endpoint yet: backed by the mock store.
// Replace the bodies with api.get/post/patch calls when it exists.
const db = createMockCollection<Programme>('programmes', () => [
  { id: 'nursing', name: 'Diploma in Nursing and Midwifery', quota: 3, requiredSubjects: ['Biology', 'Chemistry'], minGrade: 'C', active: true },
  { id: 'clinical-medicine', name: 'Diploma in Clinical Medicine', quota: 2, requiredSubjects: ['Biology', 'Chemistry', 'Physics'], minGrade: 'C', active: true },
  { id: 'pharmacy', name: 'Diploma in Pharmacy', quota: 2, requiredSubjects: ['Chemistry', 'Biology'], minGrade: 'C', active: true },
  { id: 'medical-laboratory', name: 'Diploma in Medical Laboratory', quota: 2, requiredSubjects: ['Biology', 'Chemistry'], minGrade: 'D', active: true },
  { id: 'environmental-health', name: 'Diploma in Environmental Health', quota: 2, requiredSubjects: ['Biology'], minGrade: 'D', active: true },
  { id: 'radiology', name: 'Diploma in Radiology', quota: 1, requiredSubjects: ['Physics', 'Biology'], minGrade: 'C', active: true },
]);

export const fetchProgrammes = async (): Promise<Programme[]> => db.all();

export const createProgramme = async (input: NewProgramme): Promise<Programme> => {
  const programme: Programme = { ...input, id: `${input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}` };
  db.save([...db.all(), programme]);
  return programme;
};

export const updateProgramme = async (id: string, patch: Partial<NewProgramme>): Promise<Programme> => {
  const items = db.all();
  const current = items.find((p) => p.id === id);
  if (!current) throw new Error('Programme not found');
  const updated = { ...current, ...patch };
  db.save(items.map((p) => (p.id === id ? updated : p)));
  return updated;
};
