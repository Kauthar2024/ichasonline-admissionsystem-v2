import { apiError } from '@/lib/api-error';
import { api } from '@/lib/axios';
import { USE_MOCK } from '@/lib/mock-data';
import { createMockCollection } from '@/lib/mock-store';
import { getSessionUser } from '@/lib/session';
import { fetchProgrammes } from '@/features/programmes';
import { seedApplications } from './seed';
import { computeSelection } from './selection';
import { REJECTION_REASONS, isReviewable } from './types';
import type { AppNotification, Application, Decision, DecisionInput } from './types';

// Backed by the officer endpoints of ichas-api:
//   GET  /applications/            GET  /applications/<ref>/
//   POST /applications/<ref>/decision/
//   POST /selection/               GET  /notifications/
// With VITE_USE_MOCK=true the same behaviour runs against localStorage, so the
// screens still work with no backend running. The server re-checks every rule
// below — the mock branch only mirrors them.
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

// Stand-in for the encrypted QR payload the backend issues (PRO005).
function letterToken(app: Application) {
  const raw = `${app.ref}|${app.firstChoice}|${app.nectaIndex}`;
  let h = 5381;
  for (const ch of raw) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0;
  return `ICHAS-${h.toString(16).toUpperCase().padStart(8, '0')}-${btoa(raw).slice(0, 12)}`;
}

export const fetchApplications = async (): Promise<Application[]> => {
  if (USE_MOCK) return applications.all();
  try {
    const { data } = await api.get<Application[]>('/applications/');
    return data;
  } catch (error) {
    throw apiError(error, 'Could not load applications');
  }
};

export const fetchApplication = async (ref: string): Promise<Application> => {
  if (USE_MOCK) {
    const app = applications.all().find((a) => a.ref === ref);
    if (!app) throw new Error(`Application ${ref} not found`);
    return app;
  }
  try {
    const { data } = await api.get<Application>(`/applications/${ref}/`);
    return data;
  } catch (error) {
    throw apiError(error, `Application ${ref} not found`);
  }
};

export const decideApplication = async (input: DecisionInput): Promise<Application> => {
  if (!USE_MOCK) {
    const { ref, ...body } = input;
    try {
      const { data } = await api.post<Application>(`/applications/${ref}/decision/`, body);
      return data;
    } catch (error) {
      throw apiError(error, 'Could not record the decision');
    }
  }

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
  if (!USE_MOCK) {
    try {
      const { data } = await api.post<{ admitted: number }>('/selection/');
      return data;
    } catch (error) {
      throw apiError(error, 'Could not run the selection');
    }
  }

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

// The QR image is behind the auth header, so it cannot be used as a plain
// <img src>. Fetch it through the authenticated client and hand back a data
// URL. Returns null in mock mode, where there is no backend to render it.
export const fetchLetterQr = async (ref: string): Promise<string | null> => {
  if (USE_MOCK) return null;
  try {
    const { data } = await api.get<ArrayBuffer>(`/applications/${ref}/letter/qr.png`, {
      responseType: 'arraybuffer',
    });
    let binary = '';
    for (const byte of new Uint8Array(data)) binary += String.fromCharCode(byte);
    return `data:image/png;base64,${btoa(binary)}`;
  } catch (error) {
    throw apiError(error, 'Could not load the verification QR code');
  }
};

export const fetchNotifications = async (): Promise<AppNotification[]> => {
  if (USE_MOCK) return [...notifications.all()].reverse();
  try {
    // The API already returns newest-first.
    const { data } = await api.get<AppNotification[]>('/notifications/');
    return data;
  } catch (error) {
    throw apiError(error, 'Could not load notifications');
  }
};
