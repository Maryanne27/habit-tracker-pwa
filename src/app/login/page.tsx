import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export default function Page() {
  return<AuthLayout
  title="Welcome Back"
  subtitle="Continue your habit journey"
  type="login"
>
  <LoginForm />
</AuthLayout>
}