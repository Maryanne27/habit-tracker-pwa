# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> loads the cached app shell when offline after the app has been loaded once
- Location: tests\e2e\app.spec.ts:121:7

# Error details

```
Error: page.reload: net::ERR_INTERNET_DISCONNECTED
Call log:
  - waiting for navigation until "load"

```

# Test source

```ts
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
  107 |   });
  108 | 
  109 |   test('logs out and redirects to /login', async ({ page }) => {
  110 |     await page.goto('/signup');
  111 | 
  112 |     await page.getByTestId('auth-signup-email').fill('logout@test.com');
  113 |     await page.getByTestId('auth-signup-password').fill('123456');
  114 |     await page.getByTestId('auth-signup-submit').click();
  115 | 
  116 |     await page.getByTestId('auth-logout-button').click();
  117 | 
  118 |     await page.waitForURL('/login');
  119 |   });
  120 | 
  121 |   test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
  122 |     await page.goto('/');
  123 | 
  124 |     // simulate offline
  125 |     await context.setOffline(true);
  126 | 
> 127 |     await page.reload();
      |                ^ Error: page.reload: net::ERR_INTERNET_DISCONNECTED
  128 | 
  129 |     await expect(page.locator('body')).toBeVisible();
  130 |   });
  131 | 
  132 | });
```