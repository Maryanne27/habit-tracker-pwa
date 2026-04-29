import AuthLayout from '@/components/auth/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';

export default function Page() {
  return  <AuthLayout
  title="Create Account"
  subtitle="Start building better habits today"
  type="signup"
>
  <SignupForm />
</AuthLayout>
}