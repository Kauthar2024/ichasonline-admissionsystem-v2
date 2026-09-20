import { Outlet, createFileRoute } from '@tanstack/react-router';
import { BookOpen, House, Users } from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import type { NavItem } from '@/components/layout/DashboardShell';
import { requireRole } from '@/lib/guards';

const NAV: NavItem[] = [
  { label: 'Overview', icon: <House />, path: '/admin', end: true },
  { label: 'User Management', icon: <Users />, path: '/admin/users' },
  { label: 'Programmes & Quotas', icon: <BookOpen />, path: '/admin/programmes' },
];

// Layout for /admin/*: one role guard for the whole section.
export const Route = createFileRoute('/admin')({
  beforeLoad: requireRole('admin'),
  component: () => (
    <DashboardShell role="admin" nav={NAV}>
      <Outlet />
    </DashboardShell>
  ),
});
