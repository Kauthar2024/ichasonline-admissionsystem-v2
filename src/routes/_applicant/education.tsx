import React, { useState } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useLogout } from '../../lib/use-auth';
import { LogOut, House, User, BookOpen, DollarSign, LockKeyholeOpen, Send, CircleHelp, Menu, GraduationCap, Check, Upload, FileCheck, AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/_applicant/education')({ component: EducationPage });

interface Subject { no: number; name: string; grade: string; points: number; }
const GRADE_MAP: Record<string, number> = { A: 1, B: 2, C: 3, D: 4, F: 5 };

// Sample preset result grades returned upon fetching official NECTA records
const INITIAL_SUBJECT_RESULTS = [
  { name: 'Civics', grade: 'B' },
  { name: 'History', grade: 'C' },
  { name: 'Geography', grade: 'B' },
  { name: 'Elimu ya Dini ya Kiislamu', grade: 'A' },
  { name: 'Kiswahili', grade: 'A' },
  { name: 'English', grade: 'B' },
  { name: 'Biology', grade: 'C' },
  { name: 'Basic Mathematics', grade: 'C' },
  { name: 'Commerce', grade: 'B' },
  { name: 'Book Keeping', grade: 'C' },
];

const STEPS = [
  { name: '1. Dashboard', path: '/dashboard', done: true },
  { name: '2. Education', path: '/education', active: true },
  { name: '3. Programmes', path: '/programmes' },
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

export function EducationPage() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [form, setForm] = useState({ indexNumber: '', examYear: '', submitted: false });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
  // File state & validation state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isValidResultDoc, setIsValidResultDoc] = useState<boolean>(false);

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.indexNumber || !form.examYear) return;
    
    // Automatically populate subjects structure
    setSubjects(
      INITIAL_SUBJECT_RESULTS.map((item, i) => ({
        no: i + 1,
        name: item.name,
        grade: item.grade,
        points: GRADE_MAP[item.grade] || 0,
      }))
    );
    setForm((p) => ({ ...p, submitted: true }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);

      // Simple validation logic checking file name keywords for NECTA/Result Slip
      const fileNameLower = file.name.toLowerCase();
      const validKeywords = ['result', 'necta', 'certificate', 'slip', 'transcript', 'matokeo'];
      const isResultDocument = validKeywords.some((keyword) => fileNameLower.includes(keyword));

      setIsValidResultDoc(isResultDocument);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsValidResultDoc(false);
  };

  // Calculate points dynamically only if a valid result file is uploaded
  const totalPoints = isValidResultDoc ? subjects.reduce((a, b) => a + b.points, 0) : '';

  return (
    <div className="flex flex-col h-screen w-full bg-slate-100 text-xs text-slate-800">
      <header className="bg-purple-200 text-white mpx-4 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3"><Menu className="w-5 h-5 cursor-pointer" /><span className="font-bold text-sm">ICHAS Admission</span></div>
        <div className="flex items-center gap-3"><CircleHelp className="w-4 h-4 cursor-pointer" /><User className="w-4 h-4 cursor-pointer" /></div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-4 shrink-0">
          <div>
            <div className="pb-4 mb-4 border-b border-gray-800"><h2 className="text-lg font-bold text-yellow-400">ICHAS Portal</h2><p className="text-[11px] text-gray-400">Applicant Menu</p></div>
            <nav className="flex flex-col gap-1">
              {NAV.map(({ label, icon, path, active }) => (
                <Link key={label} to={(path || '#') as any} className={`px-3 py-2.5 rounded-lg flex items-center gap-2 font-medium ${active ? 'bg-green-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                  <span>{icon}</span>{label}
                </Link>
              ))}
            </nav>
          </div>
          <button onClick={() => logout()} className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </aside>

        <main className="flex-1 p-6 bg-green-200 overflow-y-auto space-y-6">
          <div className="grid grid-cols-6 gap-2 bg-white p-2 rounded shadow-sm text-center font-semibold text-[11px]">
            {STEPS.map((s) => (
              <button key={s.name} onClick={() => navigate({ to: s.path as any })} className={`py-2 rounded flex items-center justify-center gap-1 ${s.active ? 'bg-slate-800 text-white' : s.done ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                {s.done && <Check className="w-3.5 h-3.5" />}{s.name}
              </button>
            ))}
          </div>

          <div>
            <h1 className="text-lg font-semibold flex items-center gap-2"><GraduationCap className="w-5 h-5" /> Educational Background</h1>
            <p className="text-slate-500 italic text-[11px]">Add your results based on the instruction from form</p>
          </div>

          {!form.submitted ? (
            <form onSubmit={handleFetch} className="border border-slate-300 rounded bg-white p-5 shadow-sm grid grid-cols-3 gap-4 items-end">
              <div><label className="block font-semibold mb-1">Index Number</label><input type="text" required placeholder="e.g. S0383/0052/2021" value={form.indexNumber} onChange={(e) => setForm({ ...form, indexNumber: e.target.value })} className="w-full p-2 border rounded" /></div>
              <div><label className="block font-semibold mb-1">Completion Year</label><input type="number" required placeholder="e.g. 2021" value={form.examYear} onChange={(e) => setForm({ ...form, examYear: e.target.value })} className="w-full p-2 border rounded" /></div>
              <button type="submit" className="bg-slate-800 text-white font-bold p-2 rounded">Fetch Results</button>
            </form>
          ) : (
            <>
              <div className="border border-slate-300 rounded overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-800 text-white font-semibold px-4 py-2.5">List of Registered Subjects for Ordinary Level (Form IV)</div>
                <table className="w-full text-left border-collapse">
                  <tr className="bg-slate-800 text-white border-t border-slate-700 font-semibold text-[11px]">{['School Name', 'Index Number', 'Year', 'Examination Authority', 'Status', 'Action'].map((h) => <th key={h} className="p-2.5">{h}</th>)}</tr>
                  <tr className="border-t border-slate-200"><td className="p-2.5">BEN BELLA SECONDARY SCHOOL</td><td className="p-2.5">{form.indexNumber}</td><td className="p-2.5">{form.examYear}</td><td className="p-2.5">NECTA</td><td className="p-2.5 text-green-600 font-bold">Verified</td><td className="p-2.5">No</td></tr>
                </table>
              </div>

              {/* Upload Certificate / Result Slip Section */}
              <div className="border border-slate-300 rounded overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-800 text-white font-semibold px-4 py-2">Upload Academic Document</div>
                <div className="p-4 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-slate-600" /> Result Slip / NECTA Certificate
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Please attach a clear scanned PDF or Image copy of your certificate or result slip (Max 5MB) to view and verify grades.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded text-[11px] inline-flex items-center gap-1.5 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      {uploadedFile ? 'Change File' : 'Choose File'}
                      <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Status bar based on valid document check */}
                {uploadedFile && (
                  <div className={`px-4 py-2 border-t flex items-center justify-between text-[11px] font-medium ${isValidResultDoc ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    <span className="flex items-center gap-1.5">
                      {isValidResultDoc ? (
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      Selected: <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                      {!isValidResultDoc && <span className="text-red-600 font-bold ml-2">(Invalid Document: Please upload a valid NECTA Result Slip / Certificate)</span>}
                    </span>
                    <button onClick={handleRemoveFile} className="text-red-600 hover:underline font-bold">Remove</button>
                  </div>
                )}
              </div>

              <div className="border border-slate-300 rounded overflow-hidden bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-800 text-white font-semibold">
                    <tr><th className="p-2.5 w-16">No</th><th className="p-2.5">Subject Name</th><th className="p-2.5 w-36">Grade</th><th className="p-2.5 w-32">Points</th><th className="p-2.5 w-32">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {subjects.map((s) => (
                      <tr key={s.no} className="hover:bg-slate-50">
                        <td className="p-2.5">{s.no}</td>
                        <td className="p-2.5">{s.name}</td>
                        <td className="p-2.5 font-bold text-slate-800">
                          {/* Display grade badge ONLY IF a valid result document is uploaded */}
                          {isValidResultDoc ? (
                            <span className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded font-bold">{s.grade}</span>
                          ) : null}
                        </td>
                        <td className="p-2.5 font-medium">
                          {isValidResultDoc ? s.points : ''}
                        </td>
                        <td className="p-2.5">No</td>
                      </tr>
                    ))}
                    <tr className="font-semibold bg-slate-50 border-t-2">
                      <td colSpan={3} className="p-2.5 text-right pr-4">Total Points</td>
                      <td className="p-2.5 text-emerald-700 text-sm font-bold">
                        {totalPoints}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Banner text="To add Ordinary Level (Form Four(IV)) Results for another Sitting, Please Click Here" btnText="ADD OTHER SCHOOL" onClick={() => setForm({ ...form, submitted: false })} border />
              <Banner title="Advanced Level Results" text="If you have Advanced Level Results, Click Here" btnText="ADD ADVANCED LEVEL RESULTS" />
              <Banner title="Equivalent Results" text="If you have Equivalent Level Results, Click Here" btnText="ADD EQUIVALENT LEVEL RESULTS" />

              <div className="flex justify-end pt-2">
                <button 
                  disabled={!isValidResultDoc}
                  onClick={() => navigate({ to: '/programmes' as any })} 
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded shadow disabled:bg-slate-400 disabled:cursor-not-allowed disabled:opacity-60 transition-all"
                >
                  PROCEED TO APPLICATION
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function Banner({ title, text, btnText, onClick, border }: any) {
  return (
    <div className={`border rounded overflow-hidden bg-white shadow-sm ${border ? 'border-l-4 border-l-yellow-500' : ''}`}>
      {title && <div className="bg-slate-800 text-white font-semibold px-4 py-2">{title}</div>}
      <div className="p-3 bg-slate-50 flex justify-between items-center gap-4">
        <span className="font-medium text-slate-700">{text}</span>
        <button onClick={onClick} className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded text-[11px] shrink-0">{btnText}</button>
      </div>
    </div>
  );
}