import { createFileRoute } from '@tanstack/react-router';
import { PageCard } from '@/components/layout/PageCard';
import { ApplicationReview } from '@/features/officer';

export const Route = createFileRoute('/officer/applications/$ref')({
  component: ReviewPage,
});

function ReviewPage() {
  const { ref } = Route.useParams();
  return (
    <PageCard title="Application Review" subtitle="Verify credentials against the programme entry criteria">
      <ApplicationReview reference={ref} />
    </PageCard>
  );
}
