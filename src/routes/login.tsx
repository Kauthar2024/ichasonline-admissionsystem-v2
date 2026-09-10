import React, { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../lib/use-auth';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

export function LoginPage() {
  const navigate = useNavigate();
  const [indexNumber, setIndexNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending, error } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    login(
      {
        username: indexNumber,
        password,
      },
      {
        onSuccess: () => {
          navigate({ to: '/dashboard' });
        },
      }
    );
  }

  return (
    <div className="w-full min-h-screen flex-1 bg-green-200 flex items-center justify-center p-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 border rounded-lg w-full max-w-sm space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-center">Registered User Login</h2>

        {error && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded text-center">
            {axiosIsAxiosError(error) 
              ? error.response?.data?.detail || 'Invalid username or password' 
              : 'An unexpected error occurred'}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Username / Index Number</label>
          <input
            type="text"
            required
            placeholder="Username...eg.S001/001/2010"
            value={indexNumber}
            onChange={(e) => setIndexNumber(e.target.value)}
            disabled={isPending}
            className="w-full p-2 border rounded text-sm disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              className="w-full p-2 pr-10 border rounded text-sm disabled:bg-gray-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-200 text-black font-semibold text-sm rounded-lg transition flex items-center justify-center"
        >
          {isPending ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-xs text-center text-gray-600">
          Need an account?{' '}
          <Link to="/registration" className="underline font-bold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

// Helper to safely extract Axios error messages
function axiosIsAxiosError(err: unknown): err is { response?: { data?: { detail?: string } } } {
  return typeof err === 'object' && err !== null && 'response' in err;
}