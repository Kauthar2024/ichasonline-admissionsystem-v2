import { createFileRoute } from '@tanstack/react-router';
import { PageCard } from '@/components/layout/PageCard';
import { APPLICATION_STATUSES, ApplicationsList } from '@/features/officer';
import type { ApplicationStatus, ApplicationsSearch } from '@/features/officer';

// Untrusted URL values fall back to "no filter" instead of throwing.
const validateSearch = (s: Record<string, unknown>): ApplicationsSearch => ({
  status: APPLICATION_STATUSES.includes(s.status as ApplicationStatus) ? (s.status as ApplicationStatus) : undefined,
  programme: typeof s.programme === 'string' && s.programme ? s.programme : undefined,
  q: typeof s.q === 'string' && s.q ? s.q : undefined,
});

export const Route = createFileRoute('/officer/applications/')({
  validateSearch,
  component: ApplicationsPage,
});

function ApplicationsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <PageCard title="Applications" subtitle="Filter by programme and status, then open one to review">
      <ApplicationsList search={search} onSearchChange={(patch) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true })} />
    </PageCard>
  );
}
