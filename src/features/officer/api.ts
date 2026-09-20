import { createMockCollection } from '@/lib/mock-store';
import { getSessionUser } from '@/lib/session';
import { fetchProgrammes } from '@/features/programmes';
import { seedApplications } from './seed';
import { computeSelection } from './selection';
import { REJECTION_REASONS, isReviewable } from './types';
import type { AppNotification, Application, Decision, DecisionInput } from './types';

// No backend endpoints yet: backed by the mock store.
// Replace the bodies with api.get/post calls when they exist; the hooks
// and screens only depend on these signatures.
const applications = createMockCollection<Application>('applications', seedApplications);
const notifications = createMockCollection<AppNotification>('notifications', () => []);

const now = () => new Date().toISOString();
const officerName = () => {
  const u = getSessionUser();
  return [u?.first_name, u?.last_name].filter(Boolean).join(' ') || 'Admission Officer';
};

function notify(app: Application, message: string) {
  const at = now();
  const applicant = `${app.firstName} ${app.lastName}`;
  notifications.save([
    ...notifications.all(),
    { id: `${app.ref}-sms-${at}`, ref: app.ref, applicant, channel: 'SMS', message, at },
    { id: `${app.ref}-email-${at}`, ref: app.ref, applicant, channel: 'Email', message, at },
  ]);
}

// Stand-in for the encrypted QR payload embedded in the PDF letter.
function letterToken(app: Application) {
  const raw = `${app.ref}|${app.firstChoice}|${app.nectaIndex}`;
  let h = 5381;
  for (const ch of raw) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0;
  return `ICHAS-${h.toString(16).toUpperCase().padStart(8, '0')}-${btoa(raw).slice(0, 12)}`;
}

export const fetchApplications = async (): Promise<Application[]> => applications.all();

export const fetchApplication = async (ref: string): Promise<Application> => {
  const app = applications.all().find((a) => a.ref === ref);
  if (!app) throw new Error(`Application ${ref} not found`);
  return app;
};

export const decideApplication = async (input: DecisionInput): Promise<Application> => {
  const items = applications.all();
  const current = items.find((a) => a.ref === input.ref);
  if (!current) throw new Error(`Application ${input.ref} not found`);
  if (!isReviewable(current.status)) throw new Error('This application is no longer awaiting review');
  if (input.status === 'rejected' && !input.reasonCode) throw new Error('Select a rejection reason');
  if (input.status === 'queried' && !input.comment.trim()) throw new Error('Explain what the applicant must clarify');

  const decision: Decision = {
    status: input.status,
    reasonCode: input.reasonCode,
    comment: input.comment.trim(),
    officer: officerName(),
    at: now(),
  };
  const updated: Application = {
    ...current,
    status: input.status,
    verifiedDocuments: input.verifiedDocuments,
    decisions: [...current.decisions, decision],
  };
  applications.save(items.map((a) => (a.ref === updated.ref ? updated : a)));

  const name = updated.firstName;
  if (input.status === 'verified') {
    notify(updated, `Dear ${name}, application ${updated.ref} is verified and eligible. It has been added to the selection pool.`);
  } else if (input.status === 'rejected') {
    const reason = REJECTION_REASONS.find((r) => r.code === input.reasonCode)?.label;
    notify(updated, `Dear ${name}, application ${updated.ref} was not successful. Reason: ${reason}.`);
  } else {
    notify(updated, `Dear ${name}, application ${updated.ref} needs your attention: ${decision.comment}`);
  }
  return updated;
};

// PRO005: batch selection by programme quota + admission letter generation.
export const runSelection = async (): Promise<{ admitted: number }> => {
  const programmes = await fetchProgrammes();
  const selected = computeSelection(applications.all(), programmes)
    .flatMap((p) => p.rows.filter((r) => r.outcome === 'selected').map((r) => ({ ref: r.app.ref, name: p.programme.name })));
  const names = new Map(selected.map((s) => [s.ref, s.name]));
  const generatedAt = now();

  const updated = applications.all().map((a): Application => (names.has(a.ref) ? { ...a, status: 'admitted', letter: { token: letterToken(a), generatedAt } } : a));
  applications.save(updated);
  updated
    .filter((a) => names.has(a.ref))
    .forEach((a) => notify(a, `Congratulations ${a.firstName}! You have been selected for ${names.get(a.ref)}. Log in to download your admission letter.`));

  return { admitted: selected.length };
};

export const fetchNotifications = async (): Promise<AppNotification[]> => [...notifications.all()].reverse();
