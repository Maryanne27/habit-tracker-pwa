# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> shows the splash screen and redirects unauthenticated users to /login
- Location: tests\e2e\app.spec.ts:5:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Habit Tracker app', () => {
  4   | 
  5   |   test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
> 6   |     await page.goto('/');
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  7   |     await expect(page.getByTestId('splash-screen')).toBeVisible();
  8   |     await page.waitForURL('/login');
  9   |   });
  10  | 
  11  |   test('redirects authenticated users from / to /dashboard', async ({ page }) => {
  12  |     // simulate existing session
  13  |     await page.addInitScript(() => {
  14  |       localStorage.setItem('habit-tracker-session', JSON.stringify({
  15  |         userId: '1',
  16  |         email: 'test@mail.com'
  17  |       }));
  18  |     });
  19  | 
  20  |     await page.goto('/');
  21  |     await page.waitForURL('/dashboard');
  22  |   });
  23  | 
  24  |   test('prevents unauthenticated access to /dashboard', async ({ page }) => {
  25  |     await page.goto('/dashboard');
  26  |     await page.waitForURL('/login');
  27  |   });
  28  | 
  29  |   test('signs up a new user and lands on the dashboard', async ({ page }) => {
  30  |     await page.goto('/signup');
  31  | 
  32  |     await page.getByTestId('auth-signup-email').fill('user@test.com');
  33  |     await page.getByTestId('auth-signup-password').fill('password123');
  34  |     await page.getByTestId('auth-signup-submit').click();
  35  | 
  36  |     await expect(page).toHaveURL('/dashboard');
  37  |   });
  38  | 
  39  |   test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
  40  |     // seed user + habits
  41  |     await page.addInitScript(() => {
  42  |       localStorage.setItem('habit-tracker-users', JSON.stringify([
  43  |         { id: '1', email: 'user@test.com', password: 'password123', createdAt: new Date().toISOString() },
  44  |         { id: '2', email: 'other@test.com', password: 'password123', createdAt: new Date().toISOString() }
  45  |       ]));
  46  | 
  47  |       localStorage.setItem('habit-tracker-habits', JSON.stringify([
  48  |         { id: 'h1', userId: '1', name: 'Drink Water', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] },
  49  |         { id: 'h2', userId: '2', name: 'Read Book', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] }
  50  |       ]));
  51  |     });
  52  | 
  53  |     await page.goto('/login');
  54  | 
  55  |     await page.getByTestId('auth-login-email').fill('user@test.com');
  56  |     await page.getByTestId('auth-login-password').fill('password123');
  57  |     await page.getByTestId('auth-login-submit').click();
  58  | 
  59  |     await expect(page).toHaveURL('/dashboard');
  60  | 
  61  |     await expect(page.getByTestId('habit-card-drink-water')).toBeVisible();
  62  |     await expect(page.locator('[data-testid="habit-card-read-book"]')).toHaveCount(0);
  63  |   });
  64  | 
  65  |   test('creates a habit from the dashboard', async ({ page }) => {
  66  |     await page.goto('/signup');
  67  | 
  68  |     await page.getByTestId('auth-signup-email').fill('create@test.com');
  69  |     await page.getByTestId('auth-signup-password').fill('123456');
  70  |     await page.getByTestId('auth-signup-submit').click();
  71  | 
  72  |     await page.getByTestId('habit-name-input').fill('Exercise');
  73  |     await page.getByTestId('habit-save-button').click();
  74  | 
  75  |     await expect(page.getByTestId('habit-card-exercise')).toBeVisible();
  76  |   });
  77  | 
  78  |   test('completes a habit for today and updates the streak', async ({ page }) => {
  79  |     await page.goto('/signup');
  80  | 
  81  |     await page.getByTestId('auth-signup-email').fill('streak@test.com');
  82  |     await page.getByTestId('auth-signup-password').fill('123456');
  83  |     await page.getByTestId('auth-signup-submit').click();
  84  | 
  85  |     await page.getByTestId('habit-name-input').fill('Meditate');
  86  |     await page.getByTestId('habit-save-button').click();
  87  | 
  88  |     await page.getByTestId('habit-complete-meditate').click();
  89  | 
  90  |     await expect(page.getByTestId('habit-streak-meditate')).toContainText('1');
  91  |   });
  92  | 
  93  |   test('persists session and habits after page reload', async ({ page }) => {
  94  |     await page.goto('/signup');
  95  | 
  96  |     await page.getByTestId('auth-signup-email').fill('persist@test.com');
  97  |     await page.getByTestId('auth-signup-password').fill('123456');
  98  |     await page.getByTestId('auth-signup-submit').click();
  99  | 
  100 |     await page.getByTestId('habit-name-input').fill('Read');
  101 |     await page.getByTestId('habit-save-button').click();
  102 | 
  103 |     await page.reload();
  104 | 
  105 |     await expect(page).toHaveURL('/dashboard');
  106 |     await expect(page.getByTestId('habit-card-read')).toBeVisible();
```