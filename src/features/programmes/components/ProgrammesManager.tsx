import { useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { useCreateProgramme, useProgrammes, useUpdateProgramme } from '../hooks';
import { GRADES } from '../types';
import type { Grade } from '../types';

const INPUT = 'p-2 border rounded text-xs';

export function ProgrammesManager() {
  const { data: programmes = [], isLoading } = useProgrammes();
  const update = useUpdateProgramme();

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        {isLoading ? (
          <p className="p-4 text-xs text-gray-500">Loading...</p>
        ) : programmes.length === 0 ? (
          <EmptyState message="No programmes yet. Add one below." />
        ) : (
          <table className="w-full text-xs text-left">
            <thead className="text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">Programme</th>
                <th className="px-4 py-2">Required subjects</th>
                <th className="px-4 py-2">Min. grade</th>
                <th className="px-4 py-2">Quota</th>
                <th className="px-4 py-2">Open</th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2 font-medium">{p.name}</td>
                  <td className="px-4 py-2">{p.requiredSubjects.join(', ')}</td>
                  <td className="px-4 py-2">
                    <select
                      value={p.minGrade}
                      onChange={(e) => update.mutate({ id: p.id, patch: { minGrade: e.target.value as Grade } })}
                      className={INPUT}
                      aria-label={`Minimum grade for ${p.name}`}
                    >
                      {GRADES.filter((g) => g !== 'F').map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min={0}
                      defaultValue={p.quota}
                      onBlur={(e) => {
                        const quota = Math.max(0, Number(e.target.value) || 0);
                        if (quota !== p.quota) update.mutate({ id: p.id, patch: { quota } });
                      }}
                      className={`${INPUT} w-20`}
                      aria-label={`Quota for ${p.name}`}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={p.active}
                      onChange={(e) => update.mutate({ id: p.id, patch: { active: e.target.checked } })}
                      aria-label={`${p.name} open for applications`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddProgrammeForm />
    </div>
  );
}

function AddProgrammeForm() {
  const create = useCreateProgramme();
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState('');
  const [quota, setQuota] = useState('10');
  const [minGrade, setMinGrade] = useState<Grade>('C');

  const requiredSubjects = subjects.split(',').map((s) => s.trim()).filter(Boolean);
  const valid = name.trim() !== '' && requiredSubjects.length > 0 && Number(quota) > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    create.mutate(
      { name: name.trim(), requiredSubjects, quota: Number(quota), minGrade, active: true },
      {
        onSuccess: () => {
          setName('');
          setSubjects('');
          setQuota('10');
        },
      },
    );
  }

  return (
    <form onSubmit={submit} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
      <h2 className="text-sm font-bold text-gray-900">Add programme</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <label className="md:col-span-2 space-y-1">
          <span className="font-medium">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className={`${INPUT} w-full`} placeholder="Diploma in ..." />
        </label>
        <label className="space-y-1">
          <span className="font-medium">Quota</span>
          <input type="number" min={1} value={quota} onChange={(e) => setQuota(e.target.value)} className={`${INPUT} w-full`} />
        </label>
        <label className="space-y-1">
          <span className="font-medium">Min. grade</span>
          <select value={minGrade} onChange={(e) => setMinGrade(e.target.value as Grade)} className={`${INPUT} w-full`}>
            {GRADES.filter((g) => g !== 'F').map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label className="md:col-span-4 space-y-1">
          <span className="font-medium">Required subjects (comma separated)</span>
          <input value={subjects} onChange={(e) => setSubjects(e.target.value)} className={`${INPUT} w-full`} placeholder="Biology, Chemistry" />
        </label>
      </div>
      <button
        type="submit"
        disabled={!valid || create.isPending}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-gray-300 text-white font-bold text-xs rounded-lg"
      >
        Add programme
      </button>
    </form>
  );
}
