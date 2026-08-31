import React from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { LogOut,House , User, BookOpen, DollarSign , LockKeyholeOpen , Columns3 , CircleAlert , FileQuestionMark, UserRound } from 'lucide-react';

export const Route = createFileRoute('/study-plan')({ 
  component: RouteComponent });

const ChoiceSelect = ({ label, badgeText, badgeColor }: { label: string; badgeText: string; badgeColor: string }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <span className={`text-[10px] text-white px-2 py-0.5 rounded-full font-bold ${badgeColor}`}>{badgeText}</span>
      <label className="text-xs font-semibold text-gray-700">{label}</label>
    </div>
    <select className="w-full p-2 border rounded text-xs bg-white focus:ring-1 focus:ring-slate-500">
      <option value="">Select Qualification Type</option>
      <option value="diploma">Diploma</option>
      <option value="degree">Bachelor Degree</option>
    </select>
  </div>
);

// const NavLink = ({ to, label, icon, active = false }: { to: string; label: string; icon: string; active?: boolean }) => (
//   <Link to={to as any} className={`block p-2 rounded ${active ? 'bg-slate-900 font-semibold border-l-4 border-purple-500' : 'hover:bg-slate-700'}`}>
//     {icon} {label}
//   </Link>
// );

function RouteComponent() {
  const navigate = useNavigate();


    const NAV = [
    { label: 'Welcome Page', icon: <House />, path: '/dashboard'},
    { label: 'Personal Information', icon: <User />,path: '/personal-info' },
    { label: 'Study Plan', icon: <BookOpen />, path: '/study-plan' , active: true },
    { label: 'Student Application', icon: <BookOpen />, path: '/education' },
    { label: 'Payments', icon: <DollarSign />, path: '/payments' },
    { label: 'Change Password', icon: <LockKeyholeOpen /> },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: '/personal-info' as any });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col text-xs">
      <header className="bg-purple-200 text-white p-3 flex justify-between items-center shadow-sm font-bold text-sm">
        <div>☰ ICHAS Admission</div>
        <div className="flex gap-3 text-sm"><span><FileQuestionMark /></span><span><UserRound /></span></div>
      </header>

      <div className="flex flex-1">
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

        <main className="flex-1 p-6 space-y-5">
          <div className="grid grid-cols-6 gap-2 text-center text-[11px]">
            {['✓ 1. Dashboard', '✓ 2. Education', '3. Programmes', '4. Personal', '5. Payments', '6. Submit'].map((step, i) => (
              <div key={step} className={`p-2 rounded ${i < 2 ? 'bg-emerald-100 text-emerald-800 font-medium' : i === 2 ? 'bg-slate-800 text-white font-bold' : 'bg-white text-gray-500'}`}>
                {step}
              </div>
            ))}
          </div>

          <div>
            <h1 className="text-base font-bold text-gray-800"><Columns3 />Programme Choice</h1>
            <p className="text-gray-500 italic text-[11px]">Please choose your study programme</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded text-blue-900 text-xs space-y-2">
            <p className="font-semibold"><CircleAlert /> How your choices are considered</p>
            <p>Pick the programme you want most as <strong>First Choice</strong>. Your Second Choice is used only if you don't qualify for your first. You can change these anytime before you submit your application.</p>
            <button type="button" className="bg-slate-800 text-white px-3 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase">Check Which Programmes I Qualify For</button>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded border shadow-sm">
            <div className="bg-slate-800 text-white p-3 rounded-t font-bold">Please Choose Study Programme</div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 border-l-2 border-slate-800 pl-3">
                <ChoiceSelect label="First Choice Study Level" badgeText="① Priority" badgeColor="bg-slate-800" />
                <ChoiceSelect label="First Choice Programme Name" badgeText="① Priority" badgeColor="bg-slate-800" />
              </div>
              <div className="space-y-4 border-l-2 border-emerald-600 pl-3">
                <ChoiceSelect label="Second Choice Study Level" badgeText="② Fallback" badgeColor="bg-emerald-600" />
                <ChoiceSelect label="Second Choice Programme Name" badgeText="② Fallback" badgeColor="bg-emerald-600" />
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t flex justify-end rounded-b">
              <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2.5 rounded font-bold tracking-wide uppercase transition">Save & Continue</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}