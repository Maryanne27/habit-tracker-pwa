'use client';

import { Habit } from '@/types/habit';
import { getHabitSlug } from '@/lib/slug';
import { toggleHabitCompletion } from '@/lib/habits';
import { getHabits, saveHabits } from '@/lib/storage';
import { CheckCircle2, Trash2, Edit3, Flame } from 'lucide-react';

export default function HabitCard({
  habit,
  onChange,
}: {
  habit: Habit;
  onChange?: () => void;
}) {
  const slug = getHabitSlug(habit.name);
  const today = new Date().toISOString().slice(0, 10);

  const isDone = habit.completions.includes(today);

  const handleToggle = () => {
    const all = getHabits();

    const updated = all.map((h) =>
      h.id === habit.id ? toggleHabitCompletion(h, today) : h
    );

    saveHabits(updated);
    onChange?.();
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Delete this habit?');

    if (!confirmDelete) return;

    const all = getHabits();
    const updated = all.filter((h) => h.id !== habit.id);

    saveHabits(updated);

    onChange?.();
  };

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className={`relative p-5 rounded-3xl border-2 transition-all flex justify-between items-center ${
        isDone
          ? 'bg-violet-600 border-violet-600 text-white'
          : 'bg-white border-slate-100 hover:border-violet-200'
      }`}
    >
      {/* Left */}
      <div>
        <h3 className="font-bold text-lg">{habit.name}</h3>

        <div className="flex items-center gap-2 text-sm mt-1 opacity-80">
          <Flame size={14} />
          <span data-testid={`habit-streak-${slug}`}>
            {habit.completions.length} day streak
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          data-testid={`habit-complete-${slug}`}
          onClick={handleToggle}
          className="p-2 rounded-xl hover:bg-white/10"
        >
          <CheckCircle2 />
        </button>

        <button
          data-testid={`habit-edit-${slug}`}
          className="p-2 rounded-xl hover:bg-white/10"
        >
          <Edit3 size={18} />
        </button>

        <button
          data-testid={`habit-delete-${slug}`}
          onClick={handleDelete}
          className="p-2 rounded-xl hover:bg-red-500/20"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}