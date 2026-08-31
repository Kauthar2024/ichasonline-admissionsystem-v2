import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react';
import { LogOut,House , User, BookOpen, DollarSign , LockKeyholeOpen ,Check , BookText}  from 'lucide-react';

export const Route = createFileRoute('/personal-info')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  const NAV = [
  { label: 'Welcome Page', icon: <House />, path: '/dashboard'},
  { label: 'Personal Information', icon: <User />,path: '/personal-info' , active: true },
  { label: 'Student Application', icon: <BookOpen />, path: '/education' },
  { label: 'Payments', icon: <DollarSign />, path: '/payments' },
  { label: 'Change Password', icon: <LockKeyholeOpen /> },
];

  const [form, setForm] = useState({
    firstName: 'KAUTHAR',
    middleName: 'PONGWA',
    lastName: 'NASSOR',
    gender: 'Female',
    phoneNumber: '0712531973',
    zanzibarId: '',
    nida: '',
    passportNumber: '',
    isEmployed: '',
    kinName: '',
    kinPhone: '',
    kinRelationship: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: '/payments' as any });
  };


  return  <div className="min-h-screen flex-1 bg-green-200  flex flex-col text-xs">
        {/* Top Bar */}
        <header className="bg-purple-200 text-white p-3 font-bold text-sm">
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
  
          {/* Main Section */}
          <main className="flex-1 p-6 space-y-4">
            {/* Progress Tracker */}
            <div className="grid grid-cols-6 gap-2 text-center">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded"><Check />1. Dashboard</div>
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded"><Check />2. Education</div>
              <div className="p-2 bg-white text-gray-500 rounded">3. Programmes</div>
              <div className="p-2 bg-slate-800 text-white rounded font-bold">4. Personal</div>
              <div className="p-2 bg-white text-gray-500 rounded">5. Payments</div>
              <div className="p-2 bg-white text-gray-500 rounded">6. Submit</div>
            </div>
  
            {/* Form Card */}
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h2 className="text-base font-bold text-gray-800"><BookText /> Personal Information</h2>
  
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Names */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">First Name</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Middle Name</label>
                    <input type="text" name="middleName" value={form.middleName} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Last Name</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Gender</label>
                    <input type="text" name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50" />
                  </div>
                </div>
  
                {/* ID Details */}
                <h3 className="font-bold text-gray-800 border-t pt-2">Identification Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Zanzibar ID</label>
                    <input type="text" name="zanzibarId" value={form.zanzibarId} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">NIDA</label>
                    <input type="text" name="nida" value={form.nida} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Passport Number</label>
                    <input type="text" name="passportNumber" value={form.passportNumber} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>
                </div>
  
                {/* Employment */}
                <div className="bg-slate-800 text-white p-2 rounded font-semibold">Employment Information</div>
                <div>
                  <label className="block font-semibold mb-1">Are You Employed?</label>
                  <select name="isEmployed" value={form.isEmployed} onChange={handleChange} className="p-2 border rounded bg-white w-48">
                    <option value="">Select Here</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
  
                {/* Emergency Contact */}
                <div className="bg-slate-800 text-white p-2 rounded font-semibold">Emergency Information</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Next of Kin Name</label>
                    <input type="text" name="kinName" value={form.kinName} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Phone Number</label>
                    <input type="text" name="kinPhone" value={form.kinPhone} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Relationship</label>
                    <input type="text" name="kinRelationship" value={form.kinRelationship} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>
                </div>
  
                {/* Navigation Buttons */}
                <div className="flex justify-between border-t pt-3">
                  <button type="button" onClick={() => navigate({ to: '/courses' as any })} className="px-4 py-2 border rounded hover:bg-gray-100">
                    Previous
                  </button>
                  <button type="submit" className="px-5 py-2 bg-slate-800 text-white rounded font-bold">
                    Save & Next
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
}
