import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { ClipboardList, FileCheck, House, Mail } from 'lucide-react';
import { DashboardShell } from '../components/DashboardShell';
import type { NavItem } from '../components/DashboardShell';
import { fetchOfficerApplications } from '../lib/staff-api';
import type { ApplicationStatus } from '../lib/mock-data';

export const Route = createFileRoute('/officer/')({
  component: OfficerDashboard,
});

const NAV: NavItem[] = [
  { label: 'Overview', icon: <House />, path: '/officer' },
  { label: 'Review Applications', icon: <ClipboardList /> },
  { label: 'Selection & Letters', icon: <FileCheck /> },
  { label: 'Notifications', icon: <Mail /> },
];

const STATUS: Record<ApplicationStatus, { label: string; cls: string }> = {
  submitted_paid: { label: 'Submitted & Paid', cls: 'bg-yellow-100 text-yellow-800' },
  verified: { label: 'Verified & Eligible', cls: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-800' },
  queried: { label: 'Queried', cls: 'bg-blue-100 text-blue-800' },
};

function OfficerDashboard() {
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['officer', 'applications'],
    queryFn: fetchOfficerApplications,
  });

  const count = (s: ApplicationStatus) => applications.filter((a) => a.status === s).length;

  return (
    <DashboardShell
      role="admission_officer"
      nav={NAV}
      activePath="/officer"
      title="Admission Officer Dashboard"
      subtitle="Review applications and manage selection"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.keys(STATUS) as ApplicationStatus[]).map((s) => (
          <div key={s} className="p-4 border rounded-lg bg-gray-50 border-gray-200">
            <h3 className="text-xs font-semibold uppercase text-gray-600">{STATUS[s].label}</h3>
            <p className="text-2xl font-bold mt-1 text-gray-900">{count(s)}</p>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b text-sm font-bold text-gray-900">Recent Applications</div>
        {isLoading ? (
          <p className="p-4 text-xs text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-2">Reference</th>
                  <th className="px-4 py-2">Applicant</th>
                  <th className="px-4 py-2">Programme</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.ref} className="border-t">
                    <td className="px-4 py-2 font-medium">{a.ref}</td>
                    <td className="px-4 py-2">{a.applicant}</td>
                    <td className="px-4 py-2">{a.programme}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${STATUS[a.status].cls}`}>
                        {STATUS[a.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
