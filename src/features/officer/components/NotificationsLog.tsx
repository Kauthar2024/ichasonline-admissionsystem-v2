import { EmptyState } from '@/components/ui/EmptyState';
import { useNotifications } from '../hooks';

export function NotificationsLog() {
  const { data: items = [], isLoading } = useNotifications();

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (items.length === 0) return <EmptyState message="No notifications sent yet. They appear here when you save a decision or generate letters." />;

  return (
    <div className="border border-gray-200 rounded-lg overflow-x-auto">
      <table className="w-full text-xs text-left">
        <thead className="text-gray-500 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">Sent</th>
            <th className="px-4 py-2">Applicant</th>
            <th className="px-4 py-2">Channel</th>
            <th className="px-4 py-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {items.map((n) => (
            <tr key={n.id} className="border-t align-top">
              <td className="px-4 py-2 whitespace-nowrap">{n.at.slice(0, 16).replace('T', ' ')}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {n.applicant} <span className="text-gray-500">({n.ref})</span>
              </td>
              <td className="px-4 py-2">{n.channel}</td>
              <td className="px-4 py-2">{n.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
