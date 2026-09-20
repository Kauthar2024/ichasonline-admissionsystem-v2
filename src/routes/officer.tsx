import { Outlet, createFileRoute } from '@tanstack/react-router';
import { requireRole } from '../lib/guards';

// Layout route: guards every /officer/* page.
export const Route = createFileRoute('/officer')({
  beforeLoad: requireRole('admission_officer'),
  component: () => <Outlet />,
});
