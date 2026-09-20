import { Outlet, createFileRoute } from '@tanstack/react-router';
import { requireRole } from '../../lib/guards';

// Pathless layout (no URL segment): every applicant page lives under it,
// so the role guard is declared once here instead of on each page.
export const Route = createFileRoute('/_applicant')({
  beforeLoad: requireRole('applicant'),
  component: () => <Outlet />,
});
