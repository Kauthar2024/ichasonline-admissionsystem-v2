import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, House, Users } from 'lucide-react';
import { DashboardShell } from '../components/DashboardShell';
import type { NavItem } from '../components/DashboardShell';
import { fetchAdminOverview } from '../lib/staff-api';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

const NAV: NavItem[] = [
  { label: 'Overview', icon: <House />, path: '/admin' },
  { label: 'User Management', icon: <Users /> },
  { label: 'Programmes & Quotas', icon: <BookOpen /> },
];

function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'overview'],
    queryFn: fetchAdminOverview,
  });

  const cards = [
    { title: 'Total Users', val: data?.totalUsers },
    { title: 'Admission Officers', val: data?.officers },
    { title: 'Programmes', val: data?.programmes },
    { title: 'Applications', val: data?.applications },
  ];

  return (
    <DashboardShell
      role="admin"
      nav={NAV}
      activePath="/admin"
      title="Admin Dashboard"
      subtitle="Manage users, programmes and admission quotas"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ title, val }) => (
          <div key={title} className="p-4 border rounded-lg bg-gray-50 border-gray-200">
            <h3 className="text-xs font-semibold uppercase text-gray-600">{title}</h3>
            <p className="text-2xl font-bold mt-1 text-gray-900">{isLoading ? '...' : val}</p>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
