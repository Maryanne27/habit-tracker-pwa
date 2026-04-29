import { Habit } from '@/types/habit';

const USERS_KEY = 'habit-tracker-users';
const SESSION_KEY = 'habit-tracker-session';
const HABITS_KEY = 'habit-tracker-habits';

// USERS 
export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveUsers(users: any[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

//  SESSION 
export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function saveSession(session: any) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ---------- HABITS ----------
// export function getHabits() {
//   const raw = localStorage.getItem(HABITS_KEY);
//   return raw ? JSON.parse(raw) : [];
// }

// export function saveHabits(habits: any[]) {
//   localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
// }

export function getHabits(): Habit[] {
  const data = localStorage.getItem(HABITS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveHabits(habits: Habit[]) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}