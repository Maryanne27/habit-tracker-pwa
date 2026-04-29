'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/auth';

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = signup(email, password);

    if (!result.success) {
      setError(result.error || '');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="auth-signup-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        data-testid="auth-signup-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button data-testid="auth-signup-submit" type="submit">
        Sign Up
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}