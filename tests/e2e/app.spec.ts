import { test, expect } from '@playwright/test';

test.describe('Habit Tracker app', () => {

  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('splash-screen')).toBeVisible();
    await page.waitForURL('/login');
  });

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('habit-tracker-session', JSON.stringify({
        userId: '1',
        email: 'test@mail.com'
      }));
    });

    await page.goto('/');
    await page.waitForURL('/dashboard');
  });

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL('/login');
  });

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto('/signup');

    await page.getByTestId('auth-signup-email').fill('user@test.com');
    await page.getByTestId('auth-signup-password').fill('password123');
    await page.getByTestId('auth-signup-submit').click();

    await expect(page).toHaveURL('/dashboard');
  });

  test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('habit-tracker-users', JSON.stringify([
        { id: '1', email: 'user@test.com', password: 'password123', createdAt: new Date().toISOString() },
        { id: '2', email: 'other@test.com', password: 'password123', createdAt: new Date().toISOString() }
      ]));

      localStorage.setItem('habit-tracker-habits', JSON.stringify([
        { id: 'h1', userId: '1', name: 'Drink Water', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] },
        { id: 'h2', userId: '2', name: 'Read Book', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] }
      ]));
    });

    await page.goto('/login');

    await page.getByTestId('auth-login-email').fill('user@test.com');
    await page.getByTestId('auth-login-password').fill('password123');
    await page.getByTestId('auth-login-submit').click();

    await expect(page).toHaveURL('/dashboard');

    await expect(page.getByTestId('habit-card-drink-water')).toBeVisible();
    await expect(page.locator('[data-testid="habit-card-read-book"]')).toHaveCount(0);
  });

  test('creates a habit from the dashboard', async ({ page }) => {
    await page.goto('/signup');

    await page.getByTestId('auth-signup-email').fill('create@test.com');
    await page.getByTestId('auth-signup-password').fill('123456');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('habit-name-input').fill('Exercise');
    await page.getByTestId('habit-save-button').click();

    await expect(page.getByTestId('habit-card-exercise')).toBeVisible();
  });

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.goto('/signup');

    await page.getByTestId('auth-signup-email').fill('streak@test.com');
    await page.getByTestId('auth-signup-password').fill('123456');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('habit-name-input').fill('Meditate');
    await page.getByTestId('habit-save-button').click();

    await page.getByTestId('habit-complete-meditate').click();

    await expect(page.getByTestId('habit-streak-meditate')).toContainText('1');
  });

  test('persists session and habits after page reload', async ({ page }) => {
    await page.goto('/signup');

    await page.getByTestId('auth-signup-email').fill('persist@test.com');
    await page.getByTestId('auth-signup-password').fill('123456');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('habit-name-input').fill('Read');
    await page.getByTestId('habit-save-button').click();

    await page.reload();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId('habit-card-read')).toBeVisible();
  });

  test('logs out and redirects to /login', async ({ page }) => {
    await page.goto('/signup');

    await page.getByTestId('auth-signup-email').fill('logout@test.com');
    await page.getByTestId('auth-signup-password').fill('123456');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('auth-logout-button').click();

    await page.waitForURL('/login');
  });

  test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
    await page.goto('/');

    //  offline
    await context.setOffline(true);

    await page.reload();

    await expect(page.locator('body')).toBeVisible();
  });

});