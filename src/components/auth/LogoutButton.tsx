'use client';

import { useRouter } from 'next/navigation';
import { clearSession } from '@/lib/storage';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  return (
    <button data-testid="auth-logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}