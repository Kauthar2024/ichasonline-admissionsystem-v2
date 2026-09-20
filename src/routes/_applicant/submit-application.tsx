import React, { useState } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useLogout } from '../../lib/use-auth';
import { LogOut,House , User, BookOpen, DollarSign , LockKeyholeOpen , Send } from 'lucide-react';

export const Route = createFileRoute('/_applicant/submit-application')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [agreed, setAgreed] = useState(false);
  
  const NAV = [
      { label: 'Welcome Page', icon: <House />, path: '/dashboard'},
      { label: 'Personal Information', icon: <User />,path: '/personal-info' },
      { label: 'Study Plan', icon: <BookOpen />, path: '/study-plan' },
      { label: 'Student Application', icon: <BookOpen />, path: '/education' },
      { label: 'Payments', icon: <DollarSign />, path: '/payments' },
      { label: 'Submit Application', icon: <Send />, path: '/submit-application' , active: true },
      { label: 'Change Password', icon: <LockKeyholeOpen /> },
    ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert('Please agree to the declaration before submitting.');
    alert('Application Submitted Successfully!');
    navigate({ to: '/dashboard' as any });
  };
  return<div className="min-h-screen bg-green-200 flex flex-col text-xs">
      <header className="bg-purple-200 text-white p-3 font-bold text-sm shadow">
        ICHAS Admission
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col justify-between p-4 border-r border-gray-800">
          <div>
            <div className="pb-4 mb-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-yellow-400">ICHAS Portal</h2>
              <p className="text-[11px] text-gray-400">Applicant Menu</p>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map(({ label, icon, path, active }) => {
                const cls = `px-3 py-2.5 rounded-lg transition flex items-center gap-2 font-medium ${
                  active ? 'bg-green-700 text-white font-semibold' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`;
                return path ? (
                  <Link key={label} to={path as any} className={cls}>{icon} {label}</Link>
                ) : (
                  <button key={label} type="button" className={`${cls} text-left`}>{icon} {label}</button>
                );
              })}
            </nav>
          </div>
          <div className="pt-4 border-t border-gray-800">
            <button onClick={() => logout()} className="w-full px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 flex justify-start items-start">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-300 shadow-md w-full max-w-3xl space-y-6">
            
            {/* Progress Bar */}
            <div className="grid grid-cols-6 gap-2 text-center text-[11px]">
              {['✓ 1. Dashboard', '✓ 2. Education', '✓ 3. Programmes', '✓ 4. Personal', '✓ 5. Payments', '6. Submit'].map((step, i) => (
                <div key={step} className={`p-2 rounded ${i < 5 ? 'bg-emerald-100 text-emerald-800 font-medium' : 'bg-slate-800 text-white font-bold'}`}>
                  {step}
                </div>
              ))}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">Review & Submit Application</h1>
              <p className="text-xs text-gray-500 mt-1">Please review your information carefully before final submission.</p>
            </div>

            {/* Application Summary Box */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
              <h2 className="font-bold text-gray-800 text-sm border-b pb-2">Application Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <p><strong className="text-gray-700">Full Name:</strong> Kauthar Pongwa Nassor</p>
                <p><strong className="text-gray-700">Selected Programme:</strong> Diploma in Information Technology</p>
                <p><strong className="text-gray-700">Exam Board:</strong> NECTA (Division I)</p>
                <p><strong className="text-gray-700">Payment Status:</strong> <span className="text-green-600 font-semibold">Verified</span></p>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-900">
                <input
                  type="checkbox"
                  id="declaration"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-yellow-400"
                />
                <label htmlFor="declaration" className="text-xs cursor-pointer leading-relaxed">
                  I declare that all credentials and personal information provided in this application are accurate and true to the best of my knowledge.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => navigate({ to: '/payments' as any })} className="px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                  Back to Payments
                </button>
                <button type="submit" disabled={!agreed} className={`px-6 py-2.5 font-bold text-sm rounded-lg transition ${agreed ? 'bg-green-700 hover:bg-green-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  Submit Application
                </button>
              </div>
            </form>

          </div>
        </main>
      </div>
    </div>
}

