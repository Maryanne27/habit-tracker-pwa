"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, getHabits, clearSession } from "@/lib/storage";
import { Habit } from "@/types/habit";
import HabitForm from "@/components/habits/HabitForm";
import HabitCard from "@/components/habits/HabitCard";
import { EmptyState } from "@/components/habits/EmptyState";
import { Plus, ChevronLeft, User, LogOut, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [userName, setUserName] = useState("User");
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/login");
      return;
    }
  
    setUserName(session.email.split("@")[0]);
  
    const allHabits = getHabits();
    const userHabits = allHabits.filter((h) => h.userId === session.userId);
  
    setHabits(userHabits);
  
    if (userHabits.length === 0) {
      setShowForm(true);
    }
  
  }, [router, refreshKey]);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  // Progress logic
  const today = new Date().toISOString().slice(0, 10);
  const completedToday = habits.filter((h) =>
    h.completions.includes(today)
  ).length;
  const progress =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-28">
      {/* 1. NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-violet-600 transition-colors font-semibold text-sm group"
          >
            <ChevronLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Home</span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {/* User Profile Info (Hidden on small mobile) */}
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-slate-900">
                {userName}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-tighter">
                Free Plan
              </span>
            </div>

            {/* Logout Button */}
            <button
  data-testid="auth-logout-button"
  onClick={handleLogout}
  className="flex items-center gap-2 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 px-4 py-2 rounded-xl transition-all font-bold text-sm border border-slate-100 hover:border-red-100"
>
              <LogOut size={16} />
              <span className="hidden md:inline">Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6">
        {/* 2. HEADER SECTION */}
        <section className="mt-10 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              You've completed{" "}
              <span className="text-violet-600">{progress}%</span> of your goals
              today.
            </p>
          </div>

          {/* Progress Ring Card */}
          {habits.length > 0 && (
            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 pr-8">
              <div className="relative h-14 w-14 flex items-center justify-center">
                <svg className="absolute inset-0 transform -rotate-90 w-full h-full">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="transparent"
                    className="text-slate-50"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray={150.8}
                    strokeDashoffset={150.8 - (150.8 * progress) / 100}
                    className="text-violet-600 transition-all duration-700"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[10px] font-black text-slate-900">
                  {progress}%
                </span>
              </div>
              <div className="leading-tight">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Daily Streak
                </p>
                <p className="text-sm font-bold text-slate-900">
                  Keep growing!
                </p>
              </div>
            </div>
          )}
        </section>

        {/* 3. HABITS GRID */}
        <section>
          {habits.length === 0 ? (
            <EmptyState onAddClick={() => setShowForm(true)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onChange={() => setRefreshKey((k) => k + 1)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button
       data-testid="add-habit-button"
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-violet-600 text-white h-16 w-16 rounded-2xl shadow-2xl shadow-violet-200 flex items-center justify-center hover:bg-violet-700 hover:-translate-y-2 transition-all active:scale-95 group z-50"
      >
        <Plus
          size={32}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
      </button>

      {/* FORM MODAL */}
      {showForm && (
        <HabitForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setRefreshKey((k) => k + 1);
            setShowForm(false);
          }}
        />
      )}
    </main>
  );
}
