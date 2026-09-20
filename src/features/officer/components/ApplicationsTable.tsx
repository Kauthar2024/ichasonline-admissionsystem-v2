import { Link } from '@tanstack/react-router';
import { EmptyState } from '@/components/ui/EmptyState';
import { useProgrammes } from '@/features/programmes';
import { StatusBadge } from './StatusBadge';
import type { Application } from '../types';

export function ApplicationsTable({ applications }: { applications: Application[] }) {
  const { data: programmes = [] } = useProgrammes();
  const programmeName = (id: string) => programmes.find((p) => p.id === id)?.name ?? id;

  if (applications.length === 0) return <EmptyState message="No applications match these filters." />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left">
        <thead className="text-gray-500 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">Reference</th>
            <th className="px-4 py-2">Applicant</th>
            <th className="px-4 py-2">First choice</th>
            <th className="px-4 py-2">Submitted</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a) => (
            <tr key={a.ref} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">
                <Link to="/officer/applications/$ref" params={{ ref: a.ref }} className="text-blue-700 underline">
                  {a.ref}
                </Link>
              </td>
              <td className="px-4 py-2">
                {a.firstName} {a.lastName}
              </td>
              <td className="px-4 py-2">{programmeName(a.firstChoice)}</td>
              <td className="px-4 py-2">{a.submittedAt}</td>
              <td className="px-4 py-2">
                <StatusBadge status={a.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
