import React, { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_applicant/courses')({
  component: CourseSelectionPage,
});

export function CourseSelectionPage() {
  const navigate = useNavigate();
  const [selectedProgramme, setSelectedProgramme] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: '/payment' as any });
  };

  return (
    <div className="w-full min-h-screen bg-green-200 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-md w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Select Programme</h2>
        <p className="text-xs text-gray-600">Choose the academic course you want to apply for at ICHAS.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Programme</label>
            <select
              required
              value={selectedProgramme}
              onChange={(e) => setSelectedProgramme(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="">-- Choose a Course --</option>
              <option value="diploma-pharmacy">Diploma in Pharmaceutical Sciences</option>
              <option value="diploma-nursing">Diploma in Nursing and Midwifery</option>
              <option value="diploma-clinical-medicine">Diploma in Clinical Medicine</option>
              <option value="certificate-community-health">Certificate in Community Health</option>
            </select>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate({ to: '/education' as any })}
              className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs rounded-lg"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}