import { createFileRoute } from '@tanstack/react-router';
import { PageCard } from '@/components/layout/PageCard';
import { UsersManager } from '@/features/users';
import type { UsersSearch } from '@/features/users';
import { isRole } from '@/lib/roles';

const validateSearch = (s: Record<string, unknown>): UsersSearch => ({
  role: isRole(s.role) ? s.role : undefined,
  q: typeof s.q === 'string' && s.q ? s.q : undefined,
});

export const Route = createFileRoute('/admin/users/')({
  validateSearch,
  component: UsersPage,
});

function UsersPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <PageCard title="User Management" subtitle="Activate or deactivate accounts and create staff logins">
      <UsersManager search={search} onSearchChange={(patch) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true })} />
    </PageCard>
  );
}
