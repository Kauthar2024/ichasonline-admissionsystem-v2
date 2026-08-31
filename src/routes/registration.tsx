
import React, { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/registration')({
  component: RegisterPage,
});

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ indexNumber: '', email: '', phone: '', password: '' });

  const loginPath: any = '/login';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: loginPath });
  };

  return (
    <div className="w-full  min-h-screen flex-1 bg-green-200  flex items-center justify-center p-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border shadow-sm w-full max-w-sm space-y-3">
        <h2 className="text-xl font-bold text-center">Create Account</h2>
        <select name="education" id="education" required className="w-full p-2 text-sm border rounded-lg">
          <option value=""> Choose Examination Authority for your first sitting at O-level(FIV)</option>
          <option value="secondary ">National Examination Council of Tanzania (NECTA) 1987-To Date </option>
          <option value="CSEE">CSEE Before 1987/GCE/Foreign Examination</option>
        </select>

        <input type="text" name="indexNumber" required placeholder="Index Number......Eg.S0001/0001/2000" onChange={handleChange} className="w-full p-2 text-sm border rounded-lg" />
        <input type="email" name="email" required placeholder="Valid Email Address...." onChange={handleChange} className="w-full p-2 text-sm border rounded-lg" />
        <input type="tel" name="phone" required placeholder="Telephone No.Eg.255777020304" onChange={handleChange} className="w-full p-2 text-sm border rounded-lg" />
        <input type="password" name="password" required placeholder="Password" onChange={handleChange} className="w-full p-2 text-sm border rounded-lg" />

        <button
          type="submit"
          className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm rounded-lg transition">Register</button>

        <p className="text-xs text-center text-gray-600">
          Already registered?{' '}
          <Link to={loginPath} className="font-semibold underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}