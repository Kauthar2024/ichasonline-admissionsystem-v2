import React, { useState } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useLogout } from '../../lib/use-auth';
import { LogOut, House, User, BookOpen, DollarSign, LockKeyholeOpen, RefreshCw , Menu , CircleHelp } from 'lucide-react';

export const Route = createFileRoute('/_applicant/payments')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [controlNumber, setControlNumber] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  const NAV = [
    { label: 'Welcome Page', icon: <House className="w-4 h-4" />, path: '/dashboard' },
    { label: 'Personal Information', icon: <User className="w-4 h-4" />, path: '/personal-info' },
    { label: 'Study Plan', icon: <BookOpen className="w-4 h-4" />, path: '/study-plan' },
    { label: 'Student Application', icon: <BookOpen className="w-4 h-4" />, path: '/education' },
    { label: 'Payments', icon: <DollarSign className="w-4 h-4" />, path: '/payments', active: true },
    { label: 'Change Password', icon: <LockKeyholeOpen className="w-4 h-4" /> },
  ];

  // Handler to dynamically generate Control Number
  const handleGenerateControlNumber = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = '99' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setControlNumber(generated);
      setIsGenerating(false);
    }, 800);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!controlNumber) return alert('Please generate a Control Number first!');
    alert('Payment verified successfully!');
    navigate({ to: '/submit-application' as any });
  };

  return (
    <div className="min-h-screen bg-green-200 flex flex-col text-xs">
      {/* Top Header Navigation */}
        <header className="bg-purple-200 text-white mpx-4 py-3 flex justify-between items-center shrink-0">
           <div className="flex items-center gap-3"><Menu className="w-5 h-5 cursor-pointer" /><span className="font-bold text-sm">ICHAS Admission</span></div>
                <div className="flex items-center gap-3"><CircleHelp className="w-4 h-4 cursor-pointer" /><User className="w-4 h-4 cursor-pointer" /></div>
   
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
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
                  <Link key={label} to={path as any} className={cls}>{icon} {label}</Link>
                ) : (
                  <button key={label} type="button" className={`${cls} text-left`}>{icon} {label}</button>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={() => logout()}
              className="w-full px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 flex justify-start items-start">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-300 shadow-md w-full max-w-lg space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Application Fee Payment</h2>
              <p className="text-xs text-gray-600 mt-1">Generate a Control Number and verify your application fee payment.</p>
            </div>

            {/* Control Number Box */}
            <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl text-center space-y-2">
              <p className="text-xs text-yellow-800 uppercase font-bold tracking-wider">Control Number</p>

              {controlNumber ? (
                <>
                  <p className="text-2xl font-mono font-extrabold text-gray-900 tracking-wider">{controlNumber}</p>
                  <p className="text-xs font-semibold text-gray-600">Amount: TZS 10,000</p>
                </>
              ) : (
                <div className="py-2 space-y-3">
                  <p className="text-xs text-gray-500 italic">No control number generated yet.</p>
                  <button
                    type="button"
                    onClick={handleGenerateControlNumber}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition inline-flex items-center gap-2"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Requesting...' : 'Request Control Number'}
                  </button>
                </div>
              )}
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Enter Transaction Reference / Control Ref</label>
                <input
                  type="text"
                  required
                  disabled={!controlNumber}
                  placeholder="e.g. MP260828.1042.A12345"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <button
                  type="button"
                  onClick={() => navigate({ to: '/study-plan' as any })}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!controlNumber}
                  className={`px-6 py-2.5 font-bold text-xs rounded-lg transition ${
                    controlNumber ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Verify Payment
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
