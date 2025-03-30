import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
  description:
    'Create an account and start managing your finances with ease. Track spending, set budgets, and gain financial clarity in just a few clicks.',
};

const SignUpPage = () => {
  return (
    <SignUp
      appearance={{
        baseTheme: dark,
      }}
    />
  );
};

export default SignUpPage;
