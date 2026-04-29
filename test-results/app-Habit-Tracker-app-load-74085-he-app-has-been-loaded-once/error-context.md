# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> loads the cached app shell when offline after the app has been loaded once
- Location: tests\e2e\app.spec.ts:119:7

# Error details

```
Error: page.reload: net::ERR_INTERNET_DISCONNECTED
Call log:
  - waiting for navigation until "load"

```

# Test source

```ts
  25  |     await page.waitForURL('/login');
  26  |   });
  27  | 
  28  |   test('signs up a new user and lands on the dashboard', async ({ page }) => {
  29  |     await page.goto('/signup');
  30  | 
  31  |     await page.getByTestId('auth-signup-email').fill('user@test.com');
  32  |     await page.getByTestId('auth-signup-password').fill('password123');
  33  |     await page.getByTestId('auth-signup-submit').click();
  34  | 
  35  |     await expect(page).toHaveURL('/dashboard');
  36  |   });
  37  | 
  38  |   test('logs in an existing user and loads only that user\'s habits', async ({ page }) => {
  39  |     await page.addInitScript(() => {
  40  |       localStorage.setItem('habit-tracker-users', JSON.stringify([
  41  |         { id: '1', email: 'user@test.com', password: 'password123', createdAt: new Date().toISOString() },
  42  |         { id: '2', email: 'other@test.com', password: 'password123', createdAt: new Date().toISOString() }
  43  |       ]));
  44  | 
  45  |       localStorage.setItem('habit-tracker-habits', JSON.stringify([
  46  |         { id: 'h1', userId: '1', name: 'Drink Water', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] },
  47  |         { id: 'h2', userId: '2', name: 'Read Book', description: '', frequency: 'daily', createdAt: new Date().toISOString(), completions: [] }
  48  |       ]));
  49  |     });
  50  | 
  51  |     await page.goto('/login');
  52  | 
  53  |     await page.getByTestId('auth-login-email').fill('user@test.com');
  54  |     await page.getByTestId('auth-login-password').fill('password123');
  55  |     await page.getByTestId('auth-login-submit').click();
  56  | 
  57  |     await expect(page).toHaveURL('/dashboard');
  58  | 
  59  |     await expect(page.getByTestId('habit-card-drink-water')).toBeVisible();
  60  |     await expect(page.locator('[data-testid="habit-card-read-book"]')).toHaveCount(0);
  61  |   });
  62  | 
  63  |   test('creates a habit from the dashboard', async ({ page }) => {
  64  |     await page.goto('/signup');
  65  | 
  66  |     await page.getByTestId('auth-signup-email').fill('create@test.com');
  67  |     await page.getByTestId('auth-signup-password').fill('123456');
  68  |     await page.getByTestId('auth-signup-submit').click();
  69  | 
  70  |     await page.getByTestId('habit-name-input').fill('Exercise');
  71  |     await page.getByTestId('habit-save-button').click();
  72  | 
  73  |     await expect(page.getByTestId('habit-card-exercise')).toBeVisible();
  74  |   });
  75  | 
  76  |   test('completes a habit for today and updates the streak', async ({ page }) => {
  77  |     await page.goto('/signup');
  78  | 
  79  |     await page.getByTestId('auth-signup-email').fill('streak@test.com');
  80  |     await page.getByTestId('auth-signup-password').fill('123456');
  81  |     await page.getByTestId('auth-signup-submit').click();
  82  | 
  83  |     await page.getByTestId('habit-name-input').fill('Meditate');
  84  |     await page.getByTestId('habit-save-button').click();
  85  | 
  86  |     await page.getByTestId('habit-complete-meditate').click();
  87  | 
  88  |     await expect(page.getByTestId('habit-streak-meditate')).toContainText('1');
  89  |   });
  90  | 
  91  |   test('persists session and habits after page reload', async ({ page }) => {
  92  |     await page.goto('/signup');
  93  | 
  94  |     await page.getByTestId('auth-signup-email').fill('persist@test.com');
  95  |     await page.getByTestId('auth-signup-password').fill('123456');
  96  |     await page.getByTestId('auth-signup-submit').click();
  97  | 
  98  |     await page.getByTestId('habit-name-input').fill('Read');
  99  |     await page.getByTestId('habit-save-button').click();
  100 | 
  101 |     await page.reload();
  102 | 
  103 |     await expect(page).toHaveURL('/dashboard');
  104 |     await expect(page.getByTestId('habit-card-read')).toBeVisible();
  105 |   });
  106 | 
  107 |   test('logs out and redirects to /login', async ({ page }) => {
  108 |     await page.goto('/signup');
  109 | 
  110 |     await page.getByTestId('auth-signup-email').fill('logout@test.com');
  111 |     await page.getByTestId('auth-signup-password').fill('123456');
  112 |     await page.getByTestId('auth-signup-submit').click();
  113 | 
  114 |     await page.getByTestId('auth-logout-button').click();
  115 | 
  116 |     await page.waitForURL('/login');
  117 |   });
  118 | 
  119 |   test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
  120 |     await page.goto('/');
  121 | 
  122 |     //  offline
  123 |     await context.setOffline(true);
  124 | 
> 125 |     await page.reload();
      |                ^ Error: page.reload: net::ERR_INTERNET_DISCONNECTED
  126 | 
  127 |     await expect(page.locator('body')).toBeVisible();
  128 |   });
  129 | 
  130 | });
```