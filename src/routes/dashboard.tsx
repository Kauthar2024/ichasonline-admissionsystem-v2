import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { LogOut,House , User, BookOpen, DollarSign , LockKeyholeOpen }  from 'lucide-react';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

const NAV = [
  { label: 'Welcome Page', icon: <House />, path: '/dashboard', active: true },
  { label: 'Personal Information', icon: <User />,path: '/personal-info'},
  { label: 'Study Plan', icon: <BookOpen />, path: '/study-plan' },
  { label: 'Student Application', icon: <BookOpen />, path: '/education' },
  { label: 'Payments', icon: <DollarSign />, path: '/payments'},
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
    <div className="w-full min-h-screen flex-1 bg-green-200 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col justify-between p-4 border-r border-gray-800">
          <div>
            <div className="pb-4 mb-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-yellow-400">ICHAS Portal</h2>
              <p className="text-[11px] text-gray-400">Applicant Menu</p>
            </div>

            <nav className="flex flex-col gap-1 text-xs">
              {NAV.map(({ label, icon, path, active }) => {
                const cls = `px-3 py-2.5 rounded-lg transition flex items-center gap-2 font-medium ${
                  active ? 'bg-green-700 text-white font-semibold' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`;
                return path ? (
                  <Link key={label} to={path as any} className={cls}><span>{icon}</span> {label}</Link>
                ) : (
                  <button key={label} type="button" className={`${cls} text-left`}><span>{icon}</span> {label}</button>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={() => navigate({ to: '/login' as any })}
              className="w-full px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition flex items-center justify-center gap-2"
            >
              <LogOut /> Log Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 space-y-6 bg-white overflow-y-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Applicant Dashboard</h1>
              <p className="text-xs text-gray-500">Welcome to ICHAS Online Admission Portal</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Active Application</span>
          </div>

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
        </main>
      </div>
    </div>
  );
}