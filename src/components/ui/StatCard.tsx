export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 border-gray-200">
      <h3 className="text-xs font-semibold uppercase text-gray-600">{label}</h3>
      <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
    </div>
  );
}
