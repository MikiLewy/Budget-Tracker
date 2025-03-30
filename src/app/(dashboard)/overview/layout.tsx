import { Metadata } from 'next';
import { ReactNode } from 'react';

import Page from '@/components/organisms/page/page';

export const metadata: Metadata = {
  title: 'Overview',
  description:
    'Get a clear snapshot of your finances. See your income, expenses, and budget insights all in one place to make smarter financial decisions.',
};

const OverviewLayout = ({
  children,
  transactions,
  analytics,
}: {
  children: ReactNode;
  transactions: ReactNode;
  analytics: ReactNode;
}) => {
  return (
    <Page>
      <Page.Header title="Dashboard" />
      <div className="flex flex-col grow gap-4">
        {children}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 grow">
          {analytics}
          {transactions}
        </div>
      </div>
    </Page>
  );
};

export default OverviewLayout;
