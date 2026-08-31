import React, { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
export const Route = createFileRoute('/login')({
  component: LoginPage,
});

export function LoginPage() {
  const navigate = useNavigate();
  const [indexNumber, setIndexNumber] = useState('');
  const [password, setPassword] = useState('');

  const dashboardPath: any = '/dashboard';
  const registerPath: any = '/registration';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: dashboardPath });
  }

  return (
    // <div className="w-full flex items-center justify-center p-4 bg-gray-50">
    <div className="w-full  min-h-screen flex-1 bg-green-200 flex items-center justify-center p-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 border rounded-lg w-full max-w-sm space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-center">Registered User Login </h2>

        <input
          type="text"
          required
          placeholder="Username...eg.S001/001/2010"
          value={indexNumber}
          onChange={(e) => setIndexNumber(e.target.value)}
          className="w-full p-2 border rounded text-sm"
        />

        <input
          type="password"
          required
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded text-sm"
        />

        <button
          type="submit" className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm rounded-lg transition">Sign In</button>


        <p className="text-xs text-center text-gray-600">
          Need an account?{' '}
          <Link to={registerPath} className="underline font-bold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}