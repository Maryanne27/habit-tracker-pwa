import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '@/lib/habits';

const baseHabit = {
  id: '1',
  userId: 'u1',
  name: 'Test',
  description: '',
  frequency: 'daily' as const,
  createdAt: '2026-04-28',
  completions: [],
};

describe('toggleHabitCompletion', () => {
  const today = '2026-04-28';

  it('adds a completion date when the date is not present', () => {
    const updated = toggleHabitCompletion(baseHabit, today);
    expect(updated.completions).toContain(today);
  });

  it('removes a completion date when the date already exists', () => {
    const habit = { ...baseHabit, completions: [today] };
    const updated = toggleHabitCompletion(habit, today);
    expect(updated.completions).not.toContain(today);
  });

  it('does not mutate the original habit object', () => {
    const updated = toggleHabitCompletion(baseHabit, today);
    expect(baseHabit.completions.length).toBe(0);
    expect(updated).not.toBe(baseHabit);
  });

  it('does not return duplicate completion dates', () => {
    const habit = { ...baseHabit, completions: [today] };
    const updated = toggleHabitCompletion(habit, today);
    expect(updated.completions).toEqual([]);
  });
});