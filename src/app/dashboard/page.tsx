'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, getHabits } from '@/lib/storage';
import { Habit } from '@/types/habit';
import HabitForm from '@/components/habits/HabitForm';
import { LogoutButton } from '@/components/auth/LogoutButton';
import HabitCard from '@/components/habits/HabitCard';

export default function DashboardPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.push('/login');
      return;
    }

    const allHabits = getHabits();
    const userHabits = allHabits.filter(
      (h) => h.userId === session.userId
    );

    setHabits(userHabits);
  }, [router, refreshKey]);

  useEffect(() => {
    const session = getSession();
  
    if (!session) {
      router.push('/login');
      return;
    }
  
    const allHabits = getHabits();
    const userHabits = allHabits.filter(
      (h) => h.userId === session.userId
    );
  
    setHabits(userHabits);
  }, [router, refreshKey]);

  return (
    <div data-testid="dashboard-page">
      <h1>Dashboard</h1>

      <LogoutButton />

      <HabitForm onSuccess={() => setRefreshKey((k) => k + 1)} />

      {habits.length === 0 && (
  <div data-testid="empty-state">
    No habits yet
  </div>
)}

{habits.map((habit) => (
 <HabitCard
 key={habit.id}
 habit={habit}
 onChange={() => setRefreshKey((k) => k + 1)}
/>
))}
    </div>
  );
}