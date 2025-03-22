import { QueryClient } from '@tanstack/react-query';

import { getTransactions } from '../../api/lib/transactions';
import { transactionsKeys } from '../../api/query-keys/transactions';

export const prefetchTransactions = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: transactionsKeys.list(),
    queryFn: () => getTransactions(),
  });
};
