'use client';

import { useState } from 'react';
import { getSession, getHabits, saveHabits } from '@/lib/storage';
import { Habit } from '@/types/habit';

export default function HabitForm({
  onSuccess,
  onClose,
}: {
  onSuccess?: () => void;
  onClose?: () => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [error, setError] = useState('');

  const validate = () => {
    if (name.trim().length < 2) return 'Habit name is too short';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const session = getSession();
    if (!session) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      userId: session.userId,
      name,
      description,
      frequency,
      createdAt: new Date().toISOString(),
      completions: [],
    };

    const habits = getHabits();
    saveHabits([...habits, newHabit]);

    setName('');
    setDescription('');
    setError('');
    setFrequency('daily');

    onSuccess?.();
    onClose?.(); 
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
      onClick={onClose} 
    >
      {/* MODAL BOX */}
      <div
        className="bg-white w-full max-w-lg rounded-t-[32px] md:rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create Habit</h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">
              Habit Name
            </label>
            <input
  data-testid="habit-name-input"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="e.g. Drink Water"
  className="w-full mt-2 bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-violet-500"
/>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">
              Description
            </label>
            <input
  data-testid="habit-description-input"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Optional"
  className="w-full mt-2 bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-violet-500"
/>
          </div>

          {/* Frequency */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">
              Frequency
            </label>
            <div className="flex gap-2 mt-2 bg-slate-100 p-1 rounded-2xl">
              {['daily', 'weekly'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f as any)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                    frequency === f
                      ? 'bg-white shadow text-violet-600'
                      : 'text-slate-500'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
  data-testid="habit-save-button"
  type="submit"
  className="w-full bg-violet-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-violet-700 transition"
>
  Create Habit
</button>
        </form>
      </div>
    </div>
  );
}