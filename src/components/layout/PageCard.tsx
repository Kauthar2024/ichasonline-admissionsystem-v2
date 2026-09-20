import type { ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  // Small element shown at the right of the header (badge, button...).
  aside?: ReactNode;
  children: ReactNode;
}

// The white content card every dashboard page renders inside the shell.
export function PageCard({ title, subtitle, aside, children }: Props) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-300 shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        {aside}
      </div>
      {children}
    </div>
  );
}
