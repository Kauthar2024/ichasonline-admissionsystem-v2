import { Link } from '@tanstack/react-router';
import { StatCard } from '@/components/ui/StatCard';
import { useApplications } from '../hooks';
import { APPLICATION_STATUSES, STATUS_META } from '../types';
import { ApplicationsTable } from './ApplicationsTable';

export function OfficerOverview() {
  const { data: applications = [], isLoading } = useApplications();
  const awaiting = applications.filter((a) => a.status === 'submitted_paid').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {APPLICATION_STATUSES.map((s) => (
          <StatCard key={s} label={STATUS_META[s].label} value={applications.filter((a) => a.status === s).length} />
        ))}
      </div>

      {awaiting > 0 && (
        <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg flex items-center justify-between gap-4">
          <p className="text-yellow-900">
            <b>{awaiting}</b> application{awaiting === 1 ? '' : 's'} waiting for your review.
          </p>
          <Link
            to="/officer/applications"
            search={{ status: 'submitted_paid' }}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg whitespace-nowrap"
          >
            Review now
          </Link>
        </div>
      )}

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b text-sm font-bold text-gray-900">Recent Applications</div>
        {isLoading ? <p className="p-4 text-gray-500">Loading...</p> : <ApplicationsTable applications={[...applications].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).slice(0, 6)} />}
      </div>
    </div>
  );
}
