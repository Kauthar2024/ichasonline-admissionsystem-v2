import { createFileRoute } from '@tanstack/react-router';
import { PageCard } from '@/components/layout/PageCard';
import { ProgrammesManager } from '@/features/programmes';

export const Route = createFileRoute('/admin/programmes/')({
  component: () => (
    <PageCard title="Programmes & Quotas" subtitle="Entry criteria and seats for each programme">
      <ProgrammesManager />
    </PageCard>
  ),
});
