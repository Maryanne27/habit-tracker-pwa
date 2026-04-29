import { getUsers, saveUsers, saveSession } from './storage';

export function signup(email: string, password: string) {
  const users = getUsers();

  const exists = users.find((u: any) => u.email === email);
  if (exists) {
    return { success: false, error: 'User already exists' };
  }

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  const updated = [...users, newUser];
  saveUsers(updated);

  saveSession({
    userId: newUser.id,
    email: newUser.email,
  });

  return { success: true };
}

export function login(email: string, password: string) {
  const users = getUsers();

  const user = users.find(
    (u: any) => u.email === email && u.password === password
  );

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  saveSession({
    userId: user.id,
    email: user.email,
  });

  return { success: true };
}