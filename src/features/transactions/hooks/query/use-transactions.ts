import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '../../api/lib/transactions';
import { transactionsKeys } from '../../api/query-keys/transactions';
import { Transaction } from '../../api/types/transaction';

export interface TransactionsPayload {
  limit?: number;
  dateRange?: 'all' | '30' | '7';
}

export const useTransactions = (payload: TransactionsPayload = {}) => {
  return useQuery<Transaction[]>({
    queryKey: transactionsKeys.list(payload),
    queryFn: () => getTransactions(payload),
  });
};
