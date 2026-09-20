import { Outlet, createFileRoute } from '@tanstack/react-router';
import { requireRole } from '../lib/guards';

// Layout route: guards every /admin/* page.
export const Route = createFileRoute('/admin')({
  beforeLoad: requireRole('admin'),
  component: () => <Outlet />,
});
