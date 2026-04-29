export function calculateCurrentStreak(
  completions: string[],
  today?: string
): number {
  if (!completions.length) return 0;

  const unique = Array.from(new Set(completions)).sort();

  const todayDate = today || new Date().toISOString().slice(0, 10);

  const hasToday = unique.includes(todayDate);
  if (!hasToday) return 0;

  let streak = 0;
  let current = new Date(todayDate);

  while (true) {
    const dateStr = current.toISOString().slice(0, 10);

    if (unique.includes(dateStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}