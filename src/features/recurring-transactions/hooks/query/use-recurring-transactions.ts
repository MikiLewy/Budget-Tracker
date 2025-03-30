import { useQuery } from '@tanstack/react-query';

import { getRecurringTransactions } from '../../api/lib/recurring-transactions';
import { recurringTransactionsKeys } from '../../api/query-keys/recurring-transactions';
import { RecurringTransaction } from '../../api/types/recurring-transaction';

export const useRecurringTransactions = () => {
  return useQuery<RecurringTransaction[]>({
    queryKey: recurringTransactionsKeys.list(),
    queryFn: getRecurringTransactions,
  });
};
