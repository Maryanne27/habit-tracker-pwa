import { describe, it, expect } from 'vitest';
import { calculateCurrentStreak } from '@/lib/streaks';

describe('calculateCurrentStreak', () => {
  const today = '2026-04-28';
  const yesterday = '2026-04-27';
  const twoDaysAgo = '2026-04-26';

  it('returns 0 when completions is empty', () => {
    expect(calculateCurrentStreak([], today)).toBe(0);
  });

  it('returns 0 when today is not completed', () => {
    expect(calculateCurrentStreak([yesterday], today)).toBe(0);
  });

  it('returns the correct streak for consecutive completed days', () => {
    expect(
      calculateCurrentStreak([today, yesterday], today)
    ).toBe(2);
  });

  it('ignores duplicate completion dates', () => {
    expect(
      calculateCurrentStreak([today, today, yesterday], today)
    ).toBe(2);
  });

  it('breaks the streak when a calendar day is missing', () => {
    expect(
      calculateCurrentStreak([today, twoDaysAgo], today)
    ).toBe(1);
  });
});