import { Link } from '@tanstack/react-router';
import { StatCard } from '@/components/ui/StatCard';
import { useApplications } from '@/features/officer';
import { useProgrammes } from '@/features/programmes';
import { useUsers } from '@/features/users';

// Read-only summary composed from the other features' public hooks.
export function AdminOverview() {
  const { data: users = [] } = useUsers();
  const { data: programmes = [] } = useProgrammes();
  const { data: applications = [] } = useApplications();

  const admittedBy = (id: string) => applications.filter((a) => a.firstChoice === id && a.status === 'admitted').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={users.length} />
        <StatCard label="Admission Officers" value={users.filter((u) => u.role === 'admission_officer').length} />
        <StatCard label="Open Programmes" value={programmes.filter((p) => p.active).length} />
        <StatCard label="Applications" value={applications.length} />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <div className="px-4 py-3 bg-gray-50 border-b text-sm font-bold text-gray-900 flex justify-between">
          <span>Seat usage</span>
          <Link to="/admin/programmes" className="text-blue-700 font-normal underline">
            Manage programmes
          </Link>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-2">Programme</th>
              <th className="px-4 py-2">Quota</th>
              <th className="px-4 py-2">Admitted</th>
              <th className="px-4 py-2">Seats left</th>
            </tr>
          </thead>
          <tbody>
            {programmes.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2">{p.quota}</td>
                <td className="px-4 py-2">{admittedBy(p.id)}</td>
                <td className="px-4 py-2">{Math.max(0, p.quota - admittedBy(p.id))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
