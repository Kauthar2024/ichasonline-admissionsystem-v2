import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { requireRole } from '../lib/guards';
import { House, User, BookOpen, DollarSign, LockKeyholeOpen, Send } from 'lucide-react';
import { DashboardShell } from '../components/DashboardShell';
import type { NavItem } from '../components/DashboardShell';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: requireRole('applicant'),
  component: DashboardPage,
});

const NAV: NavItem[] = [
  { label: 'Welcome Page', icon: <House />, path: '/dashboard' },
  { label: 'Personal Information', icon: <User />, path: '/personal-info' },
  { label: 'Study Plan', icon: <BookOpen />, path: '/study-plan' },
  { label: 'Student Application', icon: <BookOpen />, path: '/education' },
  { label: 'Payments', icon: <DollarSign />, path: '/payments' },
  { label: 'Submit Application', icon: <Send />, path: '/submit-application' },
  { label: 'Change Password', icon: <LockKeyholeOpen /> },
];

const CARDS = [
  { title: 'Application Status', val: 'Pending Submission', bg: 'bg-emerald-50 border-emerald-200 text-emerald-800', text: 'text-emerald-900' },
  { title: 'Selected Programme', val: 'Not Selected Yet', bg: 'bg-yellow-50 border-yellow-200 text-yellow-800', text: 'text-yellow-900' },
  { title: 'Payment Status', val: 'Unpaid', bg: 'bg-gray-50 border-gray-200 text-gray-700', text: 'text-gray-900' },
];

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <DashboardShell
      role="applicant"
      nav={NAV}
      activePath="/dashboard"
      title="Applicant Dashboard"
      subtitle="Welcome to ICHAS Online Admission Portal"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CARDS.map(({ title, val, bg, text }) => (
          <div key={title} className={`p-4 border rounded-lg ${bg}`}>
            <h3 className="text-xs font-semibold uppercase">{title}</h3>
            <p className={`text-base font-bold mt-1 ${text}`}>{val}</p>
          </div>
        ))}
      </div>

      <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-900">Complete Your Application</h2>
          <p className="text-xs text-gray-600">Fill in your academic qualifications and select your preferred courses.</p>
        </div>
        <button
          onClick={() => navigate({ to: '/education' as any })}
          className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg transition whitespace-nowrap"
        >
          Start Application
        </button>
      </div>
    </DashboardShell>
  );
}
