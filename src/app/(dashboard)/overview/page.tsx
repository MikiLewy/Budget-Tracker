import Overview from '@/features/overview/components/templates/overview';
import { prefetchTransactions } from '@/features/transactions/api/lib/transactions.prefetch';
import HydrationBoundaryProvider from '@/providers/hydration-boundary-provider';
import { prefetchUser } from '@/shared/api/lib/user.prefetch';

const OverviewPage = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 ">
      <HydrationBoundaryProvider
        prefetchDataFunctions={[
          queryClient => prefetchUser(queryClient),
          queryClient => prefetchTransactions(queryClient),
        ]}>
        <Overview />
      </HydrationBoundaryProvider>
    </div>
  );
};

export default OverviewPage;
