import { ReactNode } from 'react';

import Page from '@/components/organisms/page/page';

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
