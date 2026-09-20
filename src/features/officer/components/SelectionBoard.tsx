import { useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { useProgrammes } from '@/features/programmes';
import { useApplications, useRunSelection } from '../hooks';
import { computeSelection } from '../selection';
import type { Outcome } from '../selection';
import type { Application } from '../types';
import { LetterPreview } from './LetterPreview';

const OUTCOME: Record<Outcome, { label: string; cls: string }> = {
  admitted: { label: 'Admitted', cls: 'bg-purple-100 text-purple-800' },
  selected: { label: 'Selected', cls: 'bg-green-100 text-green-800' },
  waitlisted: { label: 'Waitlisted', cls: 'bg-gray-200 text-gray-700' },
};

export function SelectionBoard() {
  const { data: applications = [], isLoading } = useApplications();
  const { data: programmes = [] } = useProgrammes();
  const run = useRunSelection();
  const [letterFor, setLetterFor] = useState<Application | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const board = computeSelection(applications, programmes).filter((p) => p.rows.length > 0);
  const toAdmit = board.reduce((n, p) => n + p.rows.filter((r) => r.outcome === 'selected').length, 0);

  function generate() {
    if (!window.confirm(`Generate admission letters for ${toAdmit} selected candidate(s)? Applicants will be notified by SMS.`)) return;
    setMessage(null);
    run.mutate(undefined, {
      onSuccess: ({ admitted }) => setMessage(`${admitted} admission letter(s) generated and applicants notified.`),
    });
  }

  if (isLoading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-gray-700">
          Verified candidates are ranked per programme by NECTA points and selected up to each programme&apos;s quota.
          <br />
          <b>{toAdmit}</b> candidate{toAdmit === 1 ? '' : 's'} ready to be admitted.
        </p>
        <button
          type="button"
          disabled={toAdmit === 0 || run.isPending}
          onClick={generate}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white font-bold rounded-lg whitespace-nowrap"
        >
          Generate admission letters
        </button>
      </div>
      {message && <p className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">{message}</p>}

      {board.length === 0 && <EmptyState message="No verified candidates yet. Verify applications first." />}

      {board.map(({ programme, admittedCount, rows }) => (
        <section key={programme.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <h2 className="px-4 py-2 bg-gray-50 border-b text-sm font-bold text-gray-900 flex justify-between gap-2">
            <span>{programme.name}</span>
            <span className="font-normal text-gray-600">
              Quota {programme.quota} · admitted {admittedCount}
            </span>
          </h2>
          <table className="w-full text-left">
            <thead className="text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Candidate</th>
                <th className="px-4 py-2">Points</th>
                <th className="px-4 py-2">Outcome</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.app.ref} className="border-t">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2 font-medium">
                    {r.app.firstName} {r.app.lastName} <span className="text-gray-500">({r.app.ref})</span>
                  </td>
                  <td className="px-4 py-2">{r.points}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded-full font-semibold ${OUTCOME[r.outcome].cls}`}>{OUTCOME[r.outcome].label}</span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {r.outcome === 'admitted' && (
                      <button type="button" onClick={() => setLetterFor(r.app)} className="text-blue-700 underline">
                        View letter
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      {letterFor && <LetterPreview app={letterFor} onClose={() => setLetterFor(null)} />}
    </div>
  );
}
