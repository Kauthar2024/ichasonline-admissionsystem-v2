import React, { useState, useEffect } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import {
  LogOut,
  House,
  User,
  BookOpen,
  DollarSign,
  LockKeyholeOpen,
  Check,
  BookText,
  Send,
  Menu,
  CircleHelp,
  Loader2,
} from 'lucide-react';
import { usePersonalDetails, useSavePersonalDetails } from '../lib/personal-api';
import type { PersonalDetails } from '../lib/personal-api';

export const Route = createFileRoute('/personal-info')({
  component: RouteComponent,
});

// Step definition with explicit route paths
const PROGRESS_STEPS = [
  { name: '1. Dashboard', path: '/dashboard', status: 'done' },
  { name: '2. Education', path: '/education', status: 'done' },
  { name: '3. Programmes', path: '/programmes', status: 'pending' },
  { name: '4. Personal', path: '/personal-info', status: 'active' },
  { name: '5. Payments', path: '/payments', status: 'pending' },
  { name: '6. Submit', path: '/submit-application', status: 'pending' },
];

function RouteComponent() {
  const navigate = useNavigate();

  // Integrated API hooks
  const { data: apiData, isLoading, isError } = usePersonalDetails();
  const saveDetailsMutation = useSavePersonalDetails();

  const NAV = [
    { label: 'Welcome Page', icon: <House />, path: '/dashboard' },
    { label: 'Personal Information', icon: <User />, path: '/personal-info', active: true },
    { label: 'Student Application', icon: <BookOpen />, path: '/education' },
    { label: 'Payments', icon: <DollarSign />, path: '/payments' },
    { label: 'Submit Application', icon: <Send />, path: '/submit-application' },
    { label: 'Change Password', icon: <LockKeyholeOpen /> },
  ];

  const [form, setForm] = useState<PersonalDetails>({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    zanzibarId: '',
    nida: '',
    passportNumber: '',
    isEmployed: '',
    kinName: '',
    kinPhone: '',
    kinRelationship: '',
  });

  // Populate form state when API data finishes fetching
  useEffect(() => {
    if (apiData) {
      setForm({
        firstName: apiData.firstName || '',
        middleName: apiData.middleName || '',
        lastName: apiData.lastName || '',
        gender: apiData.gender || '',
        phoneNumber: apiData.phoneNumber || '',
        zanzibarId: apiData.zanzibarId || '',
        nida: apiData.nida || '',
        passportNumber: apiData.passportNumber || '',
        isEmployed: apiData.isEmployed || '',
        kinName: apiData.kinName || '',
        kinPhone: apiData.kinPhone || '',
        kinRelationship: apiData.kinRelationship || '',
      });
    }
  }, [apiData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveDetailsMutation.mutateAsync(form);
      navigate({ to: '/payments' as any });
    } catch (error) {
      console.error('Failed to save personal details:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-200 flex items-center justify-center text-xs">
        <div className="flex items-center gap-2 font-semibold text-gray-700 bg-white p-4 rounded shadow">
          <Loader2 className="w-5 h-5 animate-spin text-slate-800" />
          Loading Personal Details...
        </div>
      </div>
    );
  }

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

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col justify-between p-4 border-r border-gray-800">
          <div>
            <div className="pb-4 mb-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-yellow-400">ICHAS Portal</h2>
              <p className="text-[11px] text-gray-400">Applicant Menu</p>
            </div>

            <nav className="flex flex-col gap-1 text-xs">
              {NAV.map(({ label, icon, path, active }) => {
                const cls = `px-3 py-2.5 rounded-lg transition flex items-center gap-2 font-medium ${
                  active
                    ? 'bg-green-700 text-white font-semibold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`;
                return path ? (
                  <Link key={label} to={path as any} className={cls}>
                    <span>{icon}</span> {label}
                  </Link>
                ) : (
                  <button key={label} type="button" className={`${cls} text-left`}>
                    <span>{icon}</span> {label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={() => navigate({ to: '/login' as any })}
              className="w-full px-3 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 p-6 space-y-4">
          {/* INTERACTIVE PROGRESS TRACKER */}
          <div className="grid grid-cols-6 gap-2 text-center">
            {PROGRESS_STEPS.map((step) => {
              let styleClasses =
                'p-2 rounded font-semibold transition cursor-pointer flex items-center justify-center gap-1 ';
              if (step.status === 'active') {
                styleClasses += 'bg-slate-800 text-white';
              } else if (step.status === 'done') {
                styleClasses += 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
              } else {
                styleClasses += 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-800';
              }

              return (
                <button
                  key={step.name}
                  type="button"
                  onClick={() => navigate({ to: step.path as any })}
                  className={styleClasses}
                >
                  {step.status === 'done' && <Check className="w-3.5 h-3.5" />}
                  <span>{step.name}</span>
                </button>
              );
            })}
          </div>

          {/* Form Card */}
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <BookText className="w-4 h-4" /> Personal Information
            </h2>

            {isError && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded text-xs">
                Failed to load personal information. Please fill out the form manually or refresh.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Names */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={form.middleName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full p-2 border rounded bg-gray-50"
                  />
                </div>
              </div>

              {/* ID Details */}
              <h3 className="font-bold text-gray-800 border-t pt-2">Identification Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Zanzibar ID</label>
                  <input
                    type="text"
                    name="zanzibarId"
                    value={form.zanzibarId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">NIDA</label>
                  <input
                    type="text"
                    name="nida"
                    value={form.nida}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Passport Number</label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={form.passportNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {/* Employment */}
              <div className="bg-slate-800 text-white p-2 rounded font-semibold">
                Employment Information
              </div>
              <div>
                <label className="block font-semibold mb-1">Are You Employed?</label>
                <select
                  name="isEmployed"
                  value={form.isEmployed}
                  onChange={handleChange}
                  className="p-2 border rounded bg-white w-48"
                >
                  <option value="">Select Here</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* Emergency Contact */}
              <div className="bg-slate-800 text-white p-2 rounded font-semibold">
                Emergency Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Next of Kin Name</label>
                  <input
                    type="text"
                    name="kinName"
                    value={form.kinName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="kinPhone"
                    value={form.kinPhone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Relationship</label>
                  <input
                    type="text"
                    name="kinRelationship"
                    value={form.kinRelationship}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between border-t pt-3">
                <button
                  type="button"
                  onClick={() => navigate({ to: '/programmes' as any })}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={saveDetailsMutation.isPending}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded font-bold flex items-center gap-2 disabled:opacity-50 transition cursor-pointer"
                >
                  {saveDetailsMutation.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  Save & Next
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}