import { createFileRoute } from '@tanstack/react-router';
import { PageCard } from '@/components/layout/PageCard';
import { SelectionBoard } from '@/features/officer';

export const Route = createFileRoute('/officer/selection/')({
  component: () => (
    <PageCard title="Selection & Letters" subtitle="Select candidates by quota and generate admission letters">
      <SelectionBoard />
    </PageCard>
  ),
});
