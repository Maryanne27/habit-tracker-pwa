'use client';

import { Habit } from '@/types/habit';
import { getHabitSlug } from '@/lib/slug';
import { toggleHabitCompletion } from '@/lib/habits';
import { getHabits, saveHabits } from '@/lib/storage';

export default function HabitCard({
  habit,
  onChange,
}: {
  habit: Habit;
  onChange?: () => void;
}) {
  const slug = getHabitSlug(habit.name);
  const today = new Date().toISOString().slice(0, 10);

  const handleToggle = () => {
    const all = getHabits();

    const updated = all.map((h) =>
      h.id === habit.id ? toggleHabitCompletion(h, today) : h
    );

    saveHabits(updated);
onChange?.();
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure?');

    if (!confirmDelete) return;

    const all = getHabits();
    const updated = all.filter((h) => h.id !== habit.id);

    saveHabits(updated);
  };

  return (
    <div data-testid={`habit-card-${slug}`}>
      <h3>{habit.name}</h3>

      <p data-testid={`habit-streak-${slug}`}>
        {habit.completions.length}
      </p>

      <button
        data-testid={`habit-complete-${slug}`}
        onClick={handleToggle}
      >
        Complete
      </button>

      <button data-testid={`habit-edit-${slug}`}>
        Edit
      </button>

      <button
        data-testid={`habit-delete-${slug}`}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}