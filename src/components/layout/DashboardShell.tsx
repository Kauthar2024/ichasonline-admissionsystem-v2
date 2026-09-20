import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { CircleHelp, LogOut, Menu, User } from 'lucide-react';
import { ROLE_LABEL } from '@/lib/roles';
import type { Role } from '@/lib/roles';
import { getSessionUser } from '@/lib/session';
import { useLogout } from '@/lib/use-auth';
import { resetMockData } from '@/lib/mock-store';
import { USE_MOCK } from '@/lib/mock-data';

export interface NavItem {
  label: string;
  icon: ReactNode;
  // Items without a path render as "Soon" (screen not built yet).
  path?: string;
  // Match the path exactly (use for a section's index page).
  end?: boolean;
}

interface Props {
  role: Role;
  nav: NavItem[];
  children: ReactNode;
}

const BASE = 'px-3 py-2.5 rounded-lg transition flex items-center gap-2 font-medium';
const ICON = '[&>svg]:w-4 [&>svg]:h-4';

// Frame shared by every dashboard: top bar, sidebar, content area.
// Render it once in a layout route so it doesn't remount between pages.
export function DashboardShell({ role, nav, children }: Props) {
  const logout = useLogout();
  const user = getSessionUser();
  const name = [user?.first_name, user?.last_name].filter(Boolean).join(' ');

  return (
    <div className="min-h-screen flex-1 bg-green-200 flex flex-col text-xs">
      <header className="bg-purple-200 text-white px-4 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 cursor-pointer" />
          <span className="font-bold text-sm">ICHAS Admission</span>
        </div>
        <div className="flex items-center gap-3">
          {USE_MOCK && (
            <button
              type="button"
              onClick={resetMockData}
              className="px-2 py-1 rounded bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-semibold"
            >
              Reset demo data
            </button>
          )}
          <CircleHelp className="w-4 h-4 cursor-pointer" />
          <User className="w-4 h-4 cursor-pointer" />
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col justify-between p-4 border-r border-gray-800">
          <div>
            <div className="pb-4 mb-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-yellow-400">ICHAS Portal</h2>
              <p className="text-[11px] text-gray-400">{ROLE_LABEL[role]} Menu</p>
            </div>

            <nav className="flex flex-col gap-1 text-xs">
              {nav.map(({ label, icon, path, end }) =>
                path ? (
                  <Link
                    key={label}
                    to={path as any}
                    activeOptions={{ exact: !!end }}
                    className={`${BASE} text-gray-300 hover:bg-gray-800 hover:text-white`}
                    activeProps={{ className: `${BASE} bg-green-700 text-white font-semibold` }}
                  >
                    <span className={ICON}>{icon}</span> {label}
                  </Link>
                ) : (
                  <span key={label} className={`${BASE} text-gray-500 cursor-not-allowed`}>
                    <span className={ICON}>{icon}</span> {label}
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-gray-800">Soon</span>
                  </span>
                ),
              )}
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

        <main className="flex-1 p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
