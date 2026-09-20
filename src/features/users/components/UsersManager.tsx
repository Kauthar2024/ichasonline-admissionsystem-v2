import { useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { ROLES, ROLE_LABEL, isRole } from '@/lib/roles';
import { getSessionUser } from '@/lib/session';
import { useCreateStaffUser, useSetUserActive, useUsers } from '../hooks';
import type { StaffRole, UsersSearch } from '../types';

const INPUT = 'p-2 border rounded text-xs';

interface Props {
  search: UsersSearch;
  onSearchChange: (patch: Partial<UsersSearch>) => void;
}

export function UsersManager({ search, onSearchChange }: Props) {
  const { data: users = [], isLoading } = useUsers();
  const setActive = useSetUserActive();
  const me = getSessionUser()?.email?.toLowerCase();

  const q = search.q?.toLowerCase() ?? '';
  const rows = users.filter(
    (u) =>
      (!search.role || u.role === search.role) &&
      (!q || `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q)),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search.q ?? ''}
          onChange={(e) => onSearchChange({ q: e.target.value || undefined })}
          placeholder="Search name or email..."
          className={`${INPUT} sm:w-72`}
          aria-label="Search users"
        />
        <select
          value={search.role ?? ''}
          onChange={(e) => onSearchChange({ role: isRole(e.target.value) ? e.target.value : undefined })}
          className={INPUT}
          aria-label="Filter by role"
        >
          <option value="">All roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABEL[r]}
            </option>
          ))}
        </select>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        {isLoading ? (
          <p className="p-4 text-xs text-gray-500">Loading...</p>
        ) : rows.length === 0 ? (
          <EmptyState message="No users match these filters." />
        ) : (
          <table className="w-full text-xs text-left">
            <thead className="text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => {
                const isMe = u.email === me;
                return (
                  <tr key={u.id} className="border-t">
                    <td className="px-4 py-2 font-medium">
                      {u.firstName} {u.lastName}
                      {isMe && <span className="ml-2 text-[10px] text-gray-500">(you)</span>}
                    </td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{ROLE_LABEL[u.role]}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${u.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                        {u.active ? 'Active' : 'Deactivated'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        disabled={isMe || setActive.isPending}
                        title={isMe ? 'You cannot deactivate your own account' : undefined}
                        onClick={() => setActive.mutate({ id: u.id, active: !u.active })}
                        className="px-3 py-1 border rounded font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {u.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <AddStaffForm />
    </div>
  );
}

function AddStaffForm() {
  const create = useCreateStaffUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<StaffRole>('admission_officer');
  const [created, setCreated] = useState<string | null>(null);

  const valid = firstName.trim() !== '' && lastName.trim() !== '' && /\S+@\S+\.\S+/.test(email);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setCreated(null);
    create.mutate(
      { firstName, lastName, email, role },
      {
        onSuccess: (user) => {
          setCreated(`${user.firstName} ${user.lastName} created. A temporary password would be emailed to ${user.email}.`);
          setFirstName('');
          setLastName('');
          setEmail('');
        },
      },
    );
  }

  return (
    <form onSubmit={submit} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
      <h2 className="text-sm font-bold text-gray-900">Add staff account</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <label className="space-y-1">
          <span className="font-medium">First name</span>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={`${INPUT} w-full`} />
        </label>
        <label className="space-y-1">
          <span className="font-medium">Last name</span>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={`${INPUT} w-full`} />
        </label>
        <label className="space-y-1">
          <span className="font-medium">Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${INPUT} w-full`} />
        </label>
        <label className="space-y-1">
          <span className="font-medium">Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value as StaffRole)} className={`${INPUT} w-full`}>
            <option value="admission_officer">{ROLE_LABEL.admission_officer}</option>
            <option value="admin">{ROLE_LABEL.admin}</option>
          </select>
        </label>
      </div>

      {create.error && <p className="text-red-700">{create.error.message}</p>}
      {created && <p className="text-green-700">{created}</p>}

      <button
        type="submit"
        disabled={!valid || create.isPending}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-gray-300 text-white font-bold text-xs rounded-lg"
      >
        Create account
      </button>
    </form>
  );
}
