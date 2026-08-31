import { createFileRoute, useNavigate ,Link} from '@tanstack/react-router'
import { useState } from 'react';
import { LogOut,House , User, BookOpen, DollarSign , LockKeyholeOpen }  from 'lucide-react';

export const Route = createFileRoute('/payments')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();
      const [controlNumber] = useState('991234567890');
      const [transactionRef, setTransactionRef] = useState('');

        const NAV = [
        { label: 'Welcome Page', icon: <House />, path: '/dashboard'},
        { label: 'Personal Information', icon: <User />,path: '/personal-info' },
        { label: 'Student Application', icon: <BookOpen />, path: '/education' },
        { label: 'Payments', icon: <DollarSign />, path: '/payments' ,active:true},
        { label: 'Change Password', icon: <LockKeyholeOpen /> },
      ];
    
      const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Payment verified successfully!');
        navigate({ to: '/submit' as any });
      };


  return  <div className="w-full min-h-screen bg-green-200 flex items-center justify-center p-4">
       <aside className="w-full md:w-65 bg-gray-900 text-white flex flex-col justify-between p-5 border-r border-gray-800">
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
      <div className="bg-white p-12 rounded-xl border border-gray-300 shadow-md w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Application Fee Payment</h2>
        <p className="text-xs text-gray-600">Pay your application fee using the Control Number below.</p>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-xs text-yellow-800 uppercase font-semibold">Control Number</p>
          <p className="text-xl font-mono font-bold text-gray-900 mt-1">{controlNumber}</p>
          <p className="text-xs text-gray-500 mt-1">Amount: TZS 10,000</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Enter Transaction Reference / Control Ref</label>
            <input
              type="text"
              required
              placeholder="e.g. MP260828.1042.A12345"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate({ to: '/courses' as any })}
              className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg"
            >
              Verify Payment
            </button>
          </div>
        </form>
      </div>
    </div>
}
