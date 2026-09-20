import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useProgrammes } from '@/features/programmes';
import { checkNecta } from '../necta';
import { useApplication, useDecideApplication } from '../hooks';
import { REJECTION_REASONS, isReviewable } from '../types';
import type { Application, DecisionStatus, RejectionCode } from '../types';
import { StatusBadge } from './StatusBadge';

const SECTION = 'border border-gray-200 rounded-lg overflow-hidden';
const SECTION_TITLE = 'px-4 py-2 bg-gray-50 border-b text-sm font-bold text-gray-900';

export function ApplicationReview({ reference }: { reference: string }) {
  const { data: app, isLoading, error } = useApplication(reference);

  if (isLoading) return <p className="text-gray-500">Loading application...</p>;
  if (error || !app) {
    return (
      <div className="space-y-3">
        <p className="text-red-700">{error?.message ?? 'Application not found.'}</p>
        <BackLink />
      </div>
    );
  }
  // Remount when the application changes so local form state resets.
  return <ReviewBody key={`${app.ref}-${app.decisions.length}`} app={app} />;
}

function BackLink() {
  return (
    <Link to="/officer/applications" className="text-blue-700 underline">
      &larr; Back to applications
    </Link>
  );
}

function ReviewBody({ app }: { app: Application }) {
  const { data: programmes = [] } = useProgrammes();
  const first = programmes.find((p) => p.id === app.firstChoice);
  const second = programmes.find((p) => p.id === app.secondChoice);
  const necta = checkNecta(app, first);

  const [flags, setFlags] = useState<string[]>(app.verifiedDocuments);
  const allDocsAuthentic = app.documents.every((d) => flags.includes(d.id));

  const canVerify = necta.eligible && app.healthQualified && allDocsAuthentic;
  const editable = isReviewable(app.status);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <BackLink />
        <div className="flex items-center gap-2">
          <span className="text-gray-500">{app.ref}</span>
          <StatusBadge status={app.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className={SECTION}>
          <h2 className={SECTION_TITLE}>Applicant</h2>
          <dl className="grid grid-cols-3 gap-y-2 p-4">
            <Row label="Name" value={`${app.firstName} ${app.lastName}`} />
            <Row label="Email" value={app.email} />
            <Row label="Phone" value={app.phone} />
            <Row label="NECTA index" value={app.nectaIndex} />
            <Row label="Submitted" value={app.submittedAt} />
            <Row label="1st choice" value={first?.name ?? app.firstChoice} />
            <Row label="2nd choice" value={second?.name ?? app.secondChoice} />
            <Row
              label="Health qualification"
              value={app.healthQualified ? 'Satisfied' : 'Not satisfied'}
              tone={app.healthQualified ? 'ok' : 'bad'}
            />
          </dl>
        </section>

        <section className={SECTION}>
          <h2 className={SECTION_TITLE}>
            NECTA grade check{first ? ` — ${first.name}` : ''}
          </h2>
          <table className="w-full text-left">
            <thead className="text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-2">Required subject</th>
                <th className="px-4 py-2">Needs</th>
                <th className="px-4 py-2">Result</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {necta.rows.map((r) => (
                <tr key={r.subject} className="border-t">
                  <td className="px-4 py-2 font-medium">{r.subject}</td>
                  <td className="px-4 py-2">{r.required} or better</td>
                  <td className="px-4 py-2">{r.grade ?? 'Missing'}</td>
                  <td className={`px-4 py-2 font-semibold ${r.pass ? 'text-green-700' : 'text-red-700'}`}>{r.pass ? 'Pass' : 'Fail'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`px-4 py-2 border-t font-semibold ${necta.eligible ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {necta.eligible ? `Meets entry criteria (${necta.points} points)` : 'Does not meet entry criteria'}
          </div>
          <p className="px-4 py-2 border-t text-gray-500">
            All results: {app.subjects.map((s) => `${s.name} ${s.grade}`).join(' · ')}
          </p>
        </section>
      </div>

      <section className={SECTION}>
        <h2 className={SECTION_TITLE}>Documents</h2>
        <ul>
          {app.documents.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 px-4 py-2 border-t first:border-t-0">
              <span>
                <b>{d.name}</b> <span className="text-gray-500">({d.format}, {d.sizeKb} KB)</span>
              </span>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled={!editable}
                  checked={flags.includes(d.id)}
                  onChange={(e) => setFlags((f) => (e.target.checked ? [...f, d.id] : f.filter((x) => x !== d.id)))}
                />
                Verified authentic
              </label>
            </li>
          ))}
        </ul>
      </section>

      {editable ? (
        <DecisionPanel app={app} flags={flags} canVerify={canVerify} necta={necta.eligible} docs={allDocsAuthentic} />
      ) : (
        <p className="p-3 bg-gray-50 border rounded-lg text-gray-600">
          This application is <b>{app.status.replace('_', ' ')}</b> and can no longer be changed.
        </p>
      )}

      {app.decisions.length > 0 && (
        <section className={SECTION}>
          <h2 className={SECTION_TITLE}>Decision history</h2>
          <ul>
            {[...app.decisions].reverse().map((d) => (
              <li key={d.at} className="px-4 py-2 border-t first:border-t-0">
                <b className="capitalize">{d.status}</b> by {d.officer} on {d.at.slice(0, 10)}
                {d.reasonCode && <> — {REJECTION_REASONS.find((r) => r.code === d.reasonCode)?.label}</>}
                {d.comment && <p className="text-gray-600">{d.comment}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone?: 'ok' | 'bad' }) {
  return (
    <>
      <dt className="text-gray-500">{label}</dt>
      <dd className={`col-span-2 font-medium ${tone === 'ok' ? 'text-green-700' : tone === 'bad' ? 'text-red-700' : ''}`}>{value}</dd>
    </>
  );
}

interface PanelProps {
  app: Application;
  flags: string[];
  canVerify: boolean;
  necta: boolean;
  docs: boolean;
}

function DecisionPanel({ app, flags, canVerify, necta, docs }: PanelProps) {
  const decide = useDecideApplication();
  const [comment, setComment] = useState('');
  const [reason, setReason] = useState<RejectionCode | ''>('');

  const submit = (status: DecisionStatus) =>
    decide.mutate({ ref: app.ref, status, comment, reasonCode: status === 'rejected' ? (reason || undefined) : undefined, verifiedDocuments: flags });

  const blockers = [
    !necta && 'NECTA criteria not met',
    !app.healthQualified && 'health qualification not satisfied',
    !docs && 'not every document is marked authentic',
  ].filter(Boolean);

  return (
    <section className={SECTION}>
      <h2 className={SECTION_TITLE}>Decision</h2>
      <div className="p-4 space-y-4">
        <label className="block space-y-1">
          <span className="font-medium">Comments (required when querying)</span>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="w-full p-2 border rounded" />
        </label>

        <label className="block space-y-1">
          <span className="font-medium">Rejection reason (required when rejecting)</span>
          <select value={reason} onChange={(e) => setReason(e.target.value as RejectionCode | '')} className="w-full md:w-96 p-2 border rounded">
            <option value="">Select a reason...</option>
            {REJECTION_REASONS.map((r) => (
              <option key={r.code} value={r.code}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        {blockers.length > 0 && <p className="text-amber-700">Cannot verify: {blockers.join('; ')}.</p>}
        {decide.error && <p className="text-red-700">{decide.error.message}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!canVerify || decide.isPending}
            onClick={() => submit('verified')}
            className="px-4 py-2 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white font-bold rounded-lg"
          >
            Verified &amp; Eligible
          </button>
          <button
            type="button"
            disabled={!comment.trim() || decide.isPending}
            onClick={() => submit('queried')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 text-white font-bold rounded-lg"
          >
            Query applicant
          </button>
          <button
            type="button"
            disabled={!reason || decide.isPending}
            onClick={() => submit('rejected')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold rounded-lg"
          >
            Reject
          </button>
        </div>
        <p className="text-gray-500">The applicant is notified by SMS and email when you save a decision.</p>
      </div>
    </section>
  );
}
