'use client';

import { useState } from 'react';
import { getSession, getHabits, saveHabits } from '@/lib/storage';
import { Habit } from '@/types/habit';

export default function HabitForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const session = getSession();
    if (!session) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      userId: session.userId,
      name,
      description,
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };

    const habits = getHabits();
    saveHabits([...habits, newHabit]);

    setName('');
    setDescription('');
    onSuccess?.();
  };

  return (
    <form data-testid="habit-form" onSubmit={handleSubmit}>
      <input
        data-testid="habit-name-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Habit name"
      />

      <input
        data-testid="habit-description-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <select data-testid="habit-frequency-select">
        <option value="daily">Daily</option>
      </select>

      <button
        data-testid="habit-save-button"
        type="submit"
      >
        Save
      </button>
    </form>
  );
}