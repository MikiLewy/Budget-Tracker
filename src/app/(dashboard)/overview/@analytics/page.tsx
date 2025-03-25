import { Card } from '@/components/ui/card';
import Analytics from '@/features/overview/components/templates/analytics';
import { prefetchTransactions } from '@/features/transactions/api/lib/transactions.prefetch';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';

const OverviewAnalyticsPage = () => {
  return (
    <Card className="col-span-4 flex flex-col grow">
      <HydrationBoundaryProvider prefetchDataFunctions={[queryClient => prefetchTransactions(queryClient)]}>
        <Analytics />
      </HydrationBoundaryProvider>
    </Card>
  );
};

export default OverviewAnalyticsPage;
