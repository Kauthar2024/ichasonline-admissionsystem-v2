import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/education')({ component: EducationPage });

export function EducationPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ schoolName: '', completionYear: '', examBody: 'NECTA', division: 'Division I' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: '/courses' as any });
  };

  return (
    <div className="w-full min-h-screen flex-1 bg-green-200 flex items-center justify-center p-4 py-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-300 shadow-md w-full max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Background</h1>
          <p className="text-xs text-gray-500 mt-1">Provide your secondary education details and examination credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">School Name</label>
              <input type="text" name="schoolName" required placeholder="e.g. Lumumba Secondary School" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Completion Year</label>
              <input type="number" name="completionYear" required placeholder="e.g. 2023" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Examining Body</label>
              <select name="examBody" value={data.examBody} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option value="NECTA">NECTA</option>
                <option value="NABTEV">NABTEV</option>
                <option value="OTHER">Other Foreign Board</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Result / Award Grade</label>
              <select name="division" value={data.division} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option value="Division I">Division I</option>
                <option value="Division II">Division II</option>
                <option value="Division III">Division III</option>
                <option value="Division IV">Division IV</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Upload Certificate / Result Slip (PDF or Image)</label>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" required className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500 cursor-pointer border border-gray-300 rounded-lg p-1.5" />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={() => navigate({ to: '/dashboard' as any })} className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition">Back to Dashboard</button>
            <button type="submit" className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm rounded-lg transition">Save & Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}