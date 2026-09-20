import { createFileRoute } from '@tanstack/react-router';
import { House, User, BookOpen, DollarSign, LockKeyholeOpen, Send } from 'lucide-react';
import { ApplicationSummary } from '@/features/application';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { PageCard } from '@/components/layout/PageCard';
import type { NavItem } from '@/components/layout/DashboardShell';

export const Route = createFileRoute('/_applicant/dashboard')({
  component: DashboardPage,
});

const NAV: NavItem[] = [
  { label: 'Welcome Page', icon: <House />, path: '/dashboard', end: true },
  { label: 'Personal Information', icon: <User />, path: '/personal-info' },
  { label: 'Study Plan', icon: <BookOpen />, path: '/study-plan' },
  { label: 'Student Application', icon: <BookOpen />, path: '/education' },
  { label: 'Payments', icon: <DollarSign />, path: '/payments' },
  { label: 'Submit Application', icon: <Send />, path: '/submit-application' },
  { label: 'Change Password', icon: <LockKeyholeOpen /> },
];

function DashboardPage() {
  return (
    <DashboardShell role="applicant" nav={NAV}>
      <PageCard
        title="Applicant Dashboard"
        subtitle="Welcome to ICHAS Online Admission Portal"
        aside={<span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Applicant</span>}
      >
        <ApplicationSummary />
      </PageCard>
    </DashboardShell>
  );
}
