import { QueryClient } from '@tanstack/react-query';

import { recurringTransactionsKeys } from '../query-keys/recurring-transactions';

import { getRecurringTransactions } from './recurring-transactions';

export const prefetchRecurringTransactions = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: recurringTransactionsKeys.list(),
    queryFn: getRecurringTransactions,
  });
};
