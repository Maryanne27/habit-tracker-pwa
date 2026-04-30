'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSession, getHabits } from '@/lib/storage';
import { Habit } from '@/types/habit';
import HabitForm from '@/components/habits/HabitForm';
import HabitCard from '@/components/habits/HabitCard';
import { EmptyState } from '@/components/habits/EmptyState';
import { Plus, ChevronLeft, LayoutDashboard, User, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [userName, setUserName] = useState('User');
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push('/login');
      return;
    }

    setUserName(session.email.split('@')[0]); 
    const allHabits = getHabits();
    const userHabits = allHabits.filter((h) => h.userId === session.userId);
    setHabits(userHabits);
  }, [router, refreshKey]);

  // Calculate completion percentage for the UI
  const today = new Date().toISOString().slice(0, 10);
  const completedToday = habits.filter(h => h.completions.includes(today)).length;
  const progress = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-28">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors font-medium text-sm"
          >
            <ChevronLeft size={18} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6">
        
        {/* 2. ENHANCED HEADER SECTION */}
        <section className="mt-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <LayoutDashboard size={14} />
              <span>Personal Workspace</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Hey, {userName}! 👋
            </h1>
            <p className="text-slate-500 text-lg">
              {habits.length > 0 
                ? `You have ${habits.length - completedToday} habits left for today.` 
                : "Let's start building your first habit."}
            </p>
          </div>

          {/* Mini Progress Card */}
          {habits.length > 0 && (
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 min-w-[200px]">
              <div className="relative h-12 w-12 flex items-center justify-center">
                <svg className="absolute inset-0 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                    strokeDasharray={125.6} 
                    strokeDashoffset={125.6 - (125.6 * progress) / 100} 
                    className="text-violet-600 transition-all duration-1000" strokeLinecap="round" 
                  />
                </svg>
                <span className="text-xs font-bold">{progress}%</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Goal</p>
                <p className="text-sm font-bold text-slate-900">Keep it up!</p>
              </div>
            </div>
          )}
        </section>

        {/* 3. MAIN CONTENT AREA */}
        <section>
          {habits.length === 0 ? (
            <div className="bg-white rounded-[40px] p-12 border-2 border-dashed border-slate-100">
              <EmptyState onAddClick={() => setShowForm(true)} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
      </div>

      {/* 4. PREMIUM FLOATING ACTION BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-violet-600 text-white h-16 w-16 rounded-2xl shadow-2xl shadow-violet-200 flex items-center justify-center hover:bg-violet-700 hover:-translate-y-1 transition-all active:scale-95 group z-50"
      >
        <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* MODAL & TOAST Logic remains the same... */}
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

      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl z-[60] animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}

    </main>
  );
}