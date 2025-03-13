import Page from '@/components/organisms/page/page';
import { prefetchTransactions } from '@/features/transactions/api/lib/transactions.prefetch';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

import TransactionsPageHeaderActions from '../../organisms/transactions-page-header-actions';

import ClientTransactions from './transactions.client';

const ServerTransactions = async () => {
  return (
    <Page>
      <Page.Header title="Transactions">
        <TransactionsPageHeaderActions />
      </Page.Header>
      <Page.ContentContainer>
        <HydrationBoundaryProvider prefetchDataFunctions={[queryClient => prefetchTransactions(queryClient)]}>
          <ClientTransactions />
        </HydrationBoundaryProvider>
      </Page.ContentContainer>
    </Page>
  );
};

export default ServerTransactions;
