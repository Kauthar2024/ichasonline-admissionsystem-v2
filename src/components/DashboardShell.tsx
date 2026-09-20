import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { CircleHelp, LogOut, Menu, User } from 'lucide-react';
import { ROLE_LABEL } from '../lib/roles';
import type { Role } from '../lib/roles';
import { getSessionUser } from '../lib/session';
import { useLogout } from '../lib/use-auth';

export interface NavItem {
  label: string;
  icon: ReactNode;
  // Items without a path render as "Soon" (screen not built yet).
  path?: string;
}

interface Props {
  role: Role;
  nav: NavItem[];
  activePath: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function DashboardShell({ role, nav, activePath, title, subtitle, children }: Props) {
  const logout = useLogout();
  const user = getSessionUser();
  const name = [user?.first_name, user?.last_name].filter(Boolean).join(' ');

  return (
    <div className="min-h-screen flex-1 bg-green-200 flex flex-col text-xs">
      {/* Top Bar */}
      <header className="bg-purple-200 text-white px-4 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 cursor-pointer" />
          <span className="font-bold text-sm">ICHAS Admission</span>
        </div>
        <div className="flex items-center gap-3">
          <CircleHelp className="w-4 h-4 cursor-pointer" />
          <User className="w-4 h-4 cursor-pointer" />
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col justify-between p-4 border-r border-gray-800">
          <div>
            <div className="pb-4 mb-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-yellow-400">ICHAS Portal</h2>
              <p className="text-[11px] text-gray-400">{ROLE_LABEL[role]} Menu</p>
            </div>

            <nav className="flex flex-col gap-1 text-xs">
              {nav.map(({ label, icon, path }) => {
                const base = 'px-3 py-2.5 rounded-lg transition flex items-center gap-2 font-medium';
                if (!path) {
                  return (
                    <span key={label} className={`${base} text-gray-500 cursor-not-allowed`}>
                      <span className="[&>svg]:w-4 [&>svg]:h-4">{icon}</span> {label}
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-gray-800">Soon</span>
                    </span>
                  );
                }
                const active = path === activePath;
                return (
                  <Link
                    key={label}
                    to={path as any}
                    className={`${base} ${active ? 'bg-green-700 text-white font-semibold' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                  >
                    <span className="[&>svg]:w-4 [&>svg]:h-4">{icon}</span> {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-gray-800 space-y-3">
            {name && <p className="text-[11px] text-gray-400 truncate">Signed in as {name}</p>}
            <button
              onClick={logout}
              className="w-full px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-300 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-2">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-xs text-gray-500">{subtitle}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                {ROLE_LABEL[role]}
              </span>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
