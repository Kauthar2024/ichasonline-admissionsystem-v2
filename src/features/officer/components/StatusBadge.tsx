import { STATUS_META } from '../types';
import type { ApplicationStatus } from '../types';

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const { label, cls } = STATUS_META[status];
  return <span className={`px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${cls}`}>{label}</span>;
}
