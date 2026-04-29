'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = login(email, password);

    if (!result.success) {
      setError(result.error || '');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="auth-login-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        data-testid="auth-login-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button data-testid="auth-login-submit" type="submit">
        Login
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}