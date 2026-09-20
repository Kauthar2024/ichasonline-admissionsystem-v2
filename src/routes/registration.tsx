import React, { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useRegister } from '../lib/use-auth';

export const Route = createFileRoute('/registration')({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { mutate: register, isPending, error: apiError } = useRegister();
  
  // Local state to manage validation errors (like mismatched passwords)
  const [localError, setLocalError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    education: '',
    indexNumber: '',
    email: '',
    phone: '',
    first_name: '', 
    last_name: '',  
    password: '',
    password2: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Basic frontend verification for password confirmation
    if (formData.password !== formData.password2) {
      setLocalError("Passwords do not match.");
      return;
    }

    register(
      {
        education_authority: formData.education,
        index_number: formData.indexNumber,
        email: formData.email,
        phone: formData.phone,
        first_name: formData.first_name, 
        last_name: formData.last_name,   
        password: formData.password,
        password2: formData.password2,  
      },
      {
        onSuccess: () => {
          navigate({ to: '/login' });
        },
      }
    );
  };

  // Combine local validation errors and backend API errors
  const activeError = localError || (apiError
    ? axiosIsAxiosError(apiError)
      ? renderErrorMessage(apiError.response?.data)
      : 'Registration failed. Please check your details.'
    : null);

  return (
    <div className="w-full min-h-screen flex-1 bg-green-200 flex items-center justify-center p-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border shadow-sm w-full max-w-sm space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Create Account</h2>

        {activeError && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded text-center">
            {activeError}
          </div>
        )}

        <select
          name="education"
          id="education"
          required
          value={formData.education}
          onChange={handleChange}
          disabled={isPending}
          className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
        >
          <option value="">
            Choose Examination Authority for your first sitting at O-level(FIV)
          </option>
          <option value="NECTA">
            National Examination Council of Tanzania (NECTA) 1987-To Date
          </option>
          <option value="CSEE">
            CSEE Before 1987/GCE/Foreign Examination
          </option>
        </select>

        <input
          type="text"
          name="indexNumber"
          required
          placeholder="Index Number......Eg.S0001/0001/2000"
          value={formData.indexNumber}
          onChange={handleChange}
          disabled={isPending}
          className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
        />
        <input type="text" name="EquivalentNumber" placeholder="Equivalent Number" />

        <input
          type="text"
          name="first_name"
          required
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          disabled={isPending}
          className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
        />

        <input
          type="text"
          name="last_name"
          required
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          disabled={isPending}
          className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Valid Email Address...."
          value={formData.email}
          onChange={handleChange}
          disabled={isPending}
          className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
        />

        <input
          type="tel"
          name="phone"
          required
          placeholder="Telephone No.Eg.255777020304"
          value={formData.phone}
          onChange={handleChange}
          disabled={isPending}
          className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={isPending}
          className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
        />

        <input
          type="password" //  Fixed incorrect type="password2"
          name="password2"
          required
          placeholder="Confirm Password"
          value={formData.password2}
          onChange={handleChange}
          disabled={isPending}
          className="w-full p-2 text-sm border rounded-lg disabled:bg-gray-100"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-black font-semibold text-sm rounded-lg transition flex items-center justify-center"
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>

        <p className="text-xs text-center text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="font-semibold underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

function axiosIsAxiosError(err: unknown): err is { response?: { data?: Record<string, unknown> } } {
  return typeof err === 'object' && err !== null && 'response' in err;
}

function renderErrorMessage(data?: Record<string, unknown>): string {
  if (!data) return 'Registration failed.';
  if (typeof data.detail === 'string') return data.detail;
  
  const firstKey = Object.keys(data)[0];
  if (firstKey && Array.isArray(data[firstKey])) {
    return `${firstKey}: ${data[firstKey][0]}`;
  }
  
  return 'Invalid registration details.';
}
