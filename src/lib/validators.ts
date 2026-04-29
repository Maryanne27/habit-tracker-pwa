export function validateHabitName(name: string) {
  const trimmed = name.trim();

  if (!trimmed) {
    return {
      valid: false,
      value: '',
      error: 'Habit name is required',
    };
  }

  if (trimmed.length > 60) {
    return {
      valid: false,
      value: '',
      error: 'Habit name must be 60 characters or fewer',
    };
  }

  return {
    valid: true,
    value: trimmed,
    error: null,
  };
}