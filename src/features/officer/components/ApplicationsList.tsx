import { useProgrammes } from '@/features/programmes';
import { useApplications } from '../hooks';
import { APPLICATION_STATUSES, STATUS_META } from '../types';
import type { ApplicationsSearch } from '../types';
import { ApplicationsTable } from './ApplicationsTable';

interface Props {
  search: ApplicationsSearch;
  onSearchChange: (patch: Partial<ApplicationsSearch>) => void;
}

const INPUT = 'p-2 border rounded text-xs';

// Filter state lives in the URL (search params), so a filtered list survives
// refresh, back/forward and can be shared as a link.
export function ApplicationsList({ search, onSearchChange }: Props) {
  const { data: applications = [], isLoading } = useApplications();
  const { data: programmes = [] } = useProgrammes();

  const q = search.q?.toLowerCase() ?? '';
  const rows = applications.filter(
    (a) =>
      (!search.status || a.status === search.status) &&
      (!search.programme || a.firstChoice === search.programme) &&
      (!q || `${a.firstName} ${a.lastName} ${a.ref} ${a.nectaIndex}`.toLowerCase().includes(q)),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={search.q ?? ''}
          onChange={(e) => onSearchChange({ q: e.target.value || undefined })}
          placeholder="Search name, reference or index number..."
          className={`${INPUT} md:w-80`}
          aria-label="Search applications"
        />
        <select
          value={search.programme ?? ''}
          onChange={(e) => onSearchChange({ programme: e.target.value || undefined })}
          className={INPUT}
          aria-label="Filter by programme"
        >
          <option value="">All programmes</option>
          {programmes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          value={search.status ?? ''}
          onChange={(e) => onSearchChange({ status: (e.target.value || undefined) as ApplicationsSearch['status'] })}
          className={INPUT}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_META[s].label}
            </option>
          ))}
        </select>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {isLoading ? <p className="p-4 text-gray-500">Loading...</p> : <ApplicationsTable applications={rows} />}
      </div>
      <p className="text-gray-500">
        Showing {rows.length} of {applications.length} applications
      </p>
    </div>
  );
}
