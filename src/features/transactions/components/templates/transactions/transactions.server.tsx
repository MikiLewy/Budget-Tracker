import { Plus } from 'lucide-react';

import ClientTransactions from './transactions.client';

import Page from '@/components/organisms/page/page';
import { Button } from '@/components/ui/button';
import { prefetchTransactions } from '@/features/transactions/api/lib/transactions.prefetch';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

const ServerTransactions = async () => {
  return (
    <Page>
      <Page.Header title="Transactions">
        <Button>
          <Plus className="mr h-4 w-4" />
          Create transaction
        </Button>
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
