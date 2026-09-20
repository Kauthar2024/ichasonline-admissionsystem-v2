import { createFileRoute } from '@tanstack/react-router';
import { PageCard } from '@/components/layout/PageCard';
import { OfficerOverview } from '@/features/officer';

export const Route = createFileRoute('/officer/')({
  component: () => (
    <PageCard title="Admission Officer Dashboard" subtitle="Review applications and manage selection">
      <OfficerOverview />
    </PageCard>
  ),
});
