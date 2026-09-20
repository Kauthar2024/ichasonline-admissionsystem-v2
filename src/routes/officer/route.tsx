import { Outlet, createFileRoute } from '@tanstack/react-router';
import { ClipboardList, FileCheck, House, Mail } from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import type { NavItem } from '@/components/layout/DashboardShell';
import { requireRole } from '@/lib/guards';

const NAV: NavItem[] = [
  { label: 'Overview', icon: <House />, path: '/officer', end: true },
  { label: 'Applications', icon: <ClipboardList />, path: '/officer/applications' },
  { label: 'Selection & Letters', icon: <FileCheck />, path: '/officer/selection' },
  { label: 'Notifications', icon: <Mail />, path: '/officer/notifications' },
];

// Layout for /officer/*: one role guard for the whole section and one
// shell that stays mounted while the officer moves between pages.
export const Route = createFileRoute('/officer')({
  beforeLoad: requireRole('admission_officer'),
  component: () => (
    <DashboardShell role="admission_officer" nav={NAV}>
      <Outlet />
    </DashboardShell>
  ),
});
