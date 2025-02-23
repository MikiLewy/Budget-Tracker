import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

import ClientNavbar from './navbar.client';

import ThemeSwitcher from '@/components/atoms/theme-switcher';

const ServerNavbar = () => {
  return (
    <nav className="flex gap-4 items-center py-3 px-8 border-b">
      <Image src="/assets/logo.svg" alt="logo" width={32} height={32} />
      <ClientNavbar />
      <div className="ml-auto flex items-center gap-4">
        <ThemeSwitcher />
        <UserButton />
      </div>
    </nav>
  );
};

export default ServerNavbar;
