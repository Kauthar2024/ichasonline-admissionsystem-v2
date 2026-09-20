import { createFileRoute } from '@tanstack/react-router';
import { PageCard } from '@/components/layout/PageCard';
import { NotificationsLog } from '@/features/officer';

export const Route = createFileRoute('/officer/notifications/')({
  component: () => (
    <PageCard title="Notifications" subtitle="SMS and email messages sent to applicants">
      <NotificationsLog />
    </PageCard>
  ),
});
