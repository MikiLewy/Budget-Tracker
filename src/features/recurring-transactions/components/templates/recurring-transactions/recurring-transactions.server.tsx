import RecurringTransactionsPageHeaderActions from '../../organisms/recurring-transactions-page-header-actions';

import ClientRecurringTransactions from './recurring-transactions.client';

import Page from '@/components/organisms/page/page';
import { prefetchRecurringTransactions } from '@/features/recurring-transactions/api/lib/recurring-transactions.prefetch';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

const ServerRecurringTransactions = async () => {
  return (
    <Page>
      <Page.Header title="Recurring Transactions">
        <RecurringTransactionsPageHeaderActions />
      </Page.Header>
      <Page.ContentContainer>
        <HydrationBoundaryProvider prefetchDataFunctions={[queryClient => prefetchRecurringTransactions(queryClient)]}>
          <ClientRecurringTransactions />
        </HydrationBoundaryProvider>
      </Page.ContentContainer>
    </Page>
  );
};

export default ServerRecurringTransactions;
