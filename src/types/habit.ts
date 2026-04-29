export type HabitFrequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string;
  frequency: HabitFrequency;
  createdAt: string;
  completions: string[];
}