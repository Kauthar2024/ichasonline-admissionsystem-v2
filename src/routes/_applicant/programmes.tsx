import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useLogout } from '../../lib/use-auth';
import { isEditable, isQueried, useMyApplication, useSaveDraft } from '@/features/application';
import { useProgrammes } from '@/features/programmes';
import { LogOut, House, User, BookOpen, DollarSign, LockKeyholeOpen, Send, CircleHelp, Menu, GraduationCap, Check, Sparkles } from 'lucide-react';

export const Route = createFileRoute('/_applicant/programmes')({
  component: ProgrammesPage,
});

const STEPS = [
  { name: '1. Dashboard', path: '/dashboard', done: true },
  { name: '2. Education', path: '/education', done: true },
  { name: '3. Programmes', path: '/programmes', active: true },
  { name: '4. Personal', path: '/personal-info' },
  { name: '5. Payments', path: '/payments' },
  { name: '6. Submit', path: '/submit-application' },
];

const NAV = [
  { label: 'Welcome Page', icon: <House />, path: '/dashboard' },
  { label: 'Personal Information', icon: <User />, path: '/personal-info' },
  { label: 'Student Application', icon: <BookOpen />, path: '/education', active: true },
  { label: 'Payments', icon: <DollarSign />, path: '/payments' },
  { label: 'Submit Application', icon: <Send />, path: '/submit-application' },
  { label: 'Change Password', icon: <LockKeyholeOpen /> },
];

function ProgrammesPage() {
  const navigate = useNavigate();
  const logout = useLogout();

  const { data: programmes = [], isLoading: loadingProgrammes, error: programmesError } = useProgrammes();
  const { data: application, isLoading: loadingApplication } = useMyApplication();
  const saveDraft = useSaveDraft();

  const [firstChoice, setFirstChoice] = useState('');
  const [secondChoice, setSecondChoice] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Only programmes the admin has left open can be applied to.
  const openProgrammes = programmes.filter((p) => p.active);
  // Locked until the server confirms the application's state, so a submitted
  // application never looks editable while the query is still in flight.
  const editable = !loadingApplication && (!application || isEditable(application));

  useEffect(() => {
    if (!application) return;
    setFirstChoice(application.firstChoice);
    setSecondChoice(application.secondChoice);
  }, [application]);

  const handleNext = () => {
    setFormError(null);
    if (!firstChoice) {
      setFormError('Please select at least your First Choice Programme.');
      return;
    }
    if (!editable) {
      navigate({ to: '/personal-info' as any });
      return;
    }
    saveDraft.mutate(
      { firstChoice, secondChoice },
      { onSuccess: () => navigate({ to: '/personal-info' as any }) }
    );
  };

  const error = formError ?? saveDraft.error?.message ?? programmesError?.message ?? null;

  return (
    <div className="flex flex-col h-screen w-full bg-slate-100 text-xs text-slate-800">
      {/* Header */}
      <header className="bg-purple-200 text-white px-4 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 cursor-pointer" />
          <span className="font-semibold text-sm">ICHAS Admission</span>
        </div>
        <div className="flex items-center gap-3">
          <CircleHelp className="w-4 h-4 cursor-pointer" />
          <User className="w-4 h-4 cursor-pointer" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-4 shrink-0">
          <div>
            <div className="pb-4 mb-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-yellow-400">ICHAS Portal</h2>
              <p className="text-[11px] text-gray-400">Applicant Menu</p>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map(({ label, icon, path, active }) => (
                <Link
                  key={label}
                  to={(path || '#') as any}
                  className={`px-3 py-2.5 rounded-lg flex items-center gap-2 font-medium ${
                    active ? 'bg-green-700 text-white' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span>{icon}</span>{label}
                </Link>
              ))}
            </nav>
          </div>
          <button
            onClick={() => logout()}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-green-200 overflow-y-auto space-y-6">
          {/* Step Progress Tracker */}
          <div className="grid grid-cols-6 gap-2 bg-white p-2 rounded shadow-sm text-center font-semibold text-[11px]">
            {STEPS.map((s) => (
              <button
                key={s.name}
                onClick={() => navigate({ to: s.path as any })}
                className={`py-2 rounded flex items-center justify-center gap-1 ${
                  s.active
                    ? 'bg-slate-800 text-white'
                    : s.done
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {s.done && <Check className="w-3.5 h-3.5" />}
                {s.name}
              </button>
            ))}
          </div>

          {/* Title Banner */}
          <div>
            <h1 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
              <GraduationCap className="w-5 h-5 text-black" /> Choose Programmes
            </h1>
            <p className="text-slate-600 italic text-[11px] mt-0.5">
              Select your primary and secondary programme choices for admission
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-300 rounded text-red-800 font-medium">{error}</div>
          )}
          {isQueried(application) && (
            <div className="p-3 bg-orange-50 border border-orange-300 rounded text-orange-900 font-medium">
              The admissions office asked you to correct something. Adjust your choices if needed, then
              resubmit from the Submit Application page.
            </div>
          )}
          {application && !isEditable(application) && (
            <div className="p-3 bg-blue-50 border border-blue-300 rounded text-blue-900 font-medium">
              Your application is with the admissions office, so your choices can no longer be changed.
            </div>
          )}

          {/* Selection Card */}
          <div className="bg-white border border-slate-300 rounded-lg p-5 shadow-sm space-y-5">
            <h2 className="font-bold text-slate-800 border-b pb-2 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-black" /> Programme Choice Selection
            </h2>

            {loadingProgrammes ? (
              <p className="text-slate-600">Loading available programmes...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Choice Selection */}
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">First Choice Programme *</label>
                  <select
                    value={firstChoice}
                    disabled={!editable}
                    onChange={(e) => setFirstChoice(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded bg-slate-50 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-slate-800 disabled:opacity-60"
                  >
                    <option value="">-- Select First Choice --</option>
                    {openProgrammes.map((p) => (
                      <option key={p.id} value={p.id} disabled={p.id === secondChoice}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Second Choice Selection */}
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">Second Choice Programme (Optional)</label>
                  <select
                    value={secondChoice}
                    disabled={!editable}
                    onChange={(e) => setSecondChoice(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded bg-slate-50 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-slate-800 disabled:opacity-60"
                  >
                    <option value="">-- Select Second Choice --</option>
                    {openProgrammes.map((p) => (
                      <option key={p.id} value={p.id} disabled={p.id === firstChoice}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Cards for Overview */}
          <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-800 text-white font-semibold px-4 py-2.5 text-xs">
              Available Programmes Directory
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50">
              {openProgrammes.map((prog) => (
                <div key={prog.id} className="p-3 border rounded bg-white shadow-xs flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800">{prog.name}</p>
                    <p className="text-[11px] text-slate-600">
                      Requires {prog.requiredSubjects.join(', ')} at grade {prog.minGrade} or better
                    </p>
                    <span className="text-[10px] text-emerald-700 font-semibold">{prog.quota} seats this intake</span>
                  </div>
                </div>
              ))}
              {!loadingProgrammes && openProgrammes.length === 0 && (
                <p className="text-slate-600">No programmes are open for applications right now.</p>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => navigate({ to: '/education' as any })}
              className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded shadow"
            >
              BACK
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={saveDraft.isPending}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded shadow disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {saveDraft.isPending ? 'SAVING...' : 'SAVE & PROCEED'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}