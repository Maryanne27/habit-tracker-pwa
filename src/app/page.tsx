'use client';

import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/shared/SplashScreen';
import { useEffect } from 'react';
import { getSession } from '@/lib/storage'; 

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();

    const timer = setTimeout(() => {
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}