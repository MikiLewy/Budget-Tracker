import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionsList from '@/features/overview/components/organisms/transactions-list';
import { prefetchTransactions } from '@/features/transactions/api/lib/transactions.prefetch';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

const OverviewTransactionsPage = () => {
  return (
    <Card className="col-span-4 lg:col-span-3 flex flex-col grow">
      <CardHeader>
        <CardTitle>Recent transactions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col grow">
        <HydrationBoundaryProvider prefetchDataFunctions={[queryClient => prefetchTransactions(queryClient)]}>
          <TransactionsList />
        </HydrationBoundaryProvider>
      </CardContent>
    </Card>
  );
};

export default OverviewTransactionsPage;
