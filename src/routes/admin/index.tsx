import { createFileRoute } from '@tanstack/react-router';
import { PageCard } from '@/components/layout/PageCard';
import { AdminOverview } from '@/features/admin';

export const Route = createFileRoute('/admin/')({
  component: () => (
    <PageCard title="Admin Dashboard" subtitle="Manage users, programmes and admission quotas">
      <AdminOverview />
    </PageCard>
  ),
});
