import { ReactNode } from 'react';

import { Navbar } from '@/components/organisms/navbar';

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <main className="grow flex flex-col p-8 pt-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
