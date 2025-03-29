import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
  description:
    'Log in to your budget tracker and take control of your finances. Track expenses, manage budgets, and stay on top of your money effortlessly',
};

const SignInPage = () => {
  return (
    <SignIn
      appearance={{
        baseTheme: dark,
      }}
    />
  );
};

export default SignInPage;
