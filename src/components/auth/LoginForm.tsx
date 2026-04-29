'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.includes('@')) return 'Enter a valid email address';
    if (password.length < 4) return 'Password is too short';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const err = validate();
    if (err) return setError(err);

    setLoading(true);

    const result = login(email, password);

    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Login failed');
      return;
    }

    router.push('/dashboard');
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          data-testid="auth-login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-violet-500 outline-none"
        />

        <input
          data-testid="auth-login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-violet-500 outline-none"
        />

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          data-testid="auth-login-submit"
          disabled={loading}
          className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold disabled:opacity-50 hover:bg-violet-700 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* ✅ CTA BUTTON (NOT LINK) */}
        <button
          type="button"
          onClick={goToSignup}
          className="w-full mt-3 bg-slate-100 text-slate-900 py-4 rounded-2xl font-semibold hover:bg-slate-200 transition"
        >
          Create new account
        </button>

      </form>
    </div>
  );
}