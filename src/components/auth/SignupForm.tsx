'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/auth';

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email.includes('@')) return 'Enter a valid email address';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const err = validate();
    if (err) return setError(err);

    const result = signup(email, password);

    if (!result.success) {
      setError(result.error || 'Signup failed');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="space-y-6">

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          data-testid="auth-signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-violet-500 outline-none"
        />

        <input
          data-testid="auth-signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 chars)"
          className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-violet-500 outline-none"
        />

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          data-testid="auth-signup-submit"
          type="submit"
          className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold hover:bg-violet-700 transition"
        >
          Create account
        </button>
      </form>

      {/* CTA SECTION */}
      <div className="text-center space-y-3 pt-4 border-t border-slate-100">

        <p className="text-sm text-slate-500 font-medium">
          Already have an account?
        </p>

        <button
          type="button"
          onClick={() => router.push('/login')}
          className="w-full bg-slate-100 text-slate-800 py-3 rounded-2xl font-semibold hover:bg-slate-200 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}