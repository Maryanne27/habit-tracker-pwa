'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, getHabits } from '@/lib/storage';
import { Habit } from '@/types/habit';
import HabitForm from '@/components/habits/HabitForm';
import HabitCard from '@/components/habits/HabitCard';
import { EmptyState } from '@/components/habits/EmptyState';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState('');

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
    <main className="min-h-screen bg-slate-50 pb-28 overflow-x-hidden">

      {/* HEADER */}
      <section className="bg-white px-6 pt-12 pb-8 rounded-b-[40px] shadow-sm md:max-w-4xl md:mx-auto md:mt-8 md:rounded-[40px]">
        <h1 className="text-2xl font-bold text-slate-900">
          Your Dashboard
        </h1>
        <p className="text-slate-500">
          Build consistency, one habit at a time.
        </p>
      </section>

      {/* main*/}
      <section className="px-6 mt-8 max-w-4xl mx-auto">

        {habits.length === 0 ? (
          <EmptyState onAddClick={() => setShowForm(true)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onChange={() => {
                  setRefreshKey((k) => k + 1);
                  setToast('Habit updated');
                  setTimeout(() => setToast(''), 2000);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* FLOATING BUTTON */}
      {/* <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-violet-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition"
      >
        <Plus size={28} />
      </button> */}

      {/* MODAL */}
      {showForm && (
        <HabitForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setRefreshKey((k) => k + 1);
            setShowForm(false);
            setToast('Habit created 🎉');
            setTimeout(() => setToast(''), 2000);
          }}
        />
      )}

      {/* TOAST (GLOBAL FIX) */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50">
          {toast}
        </div>
      )}

    </main>
  );
}