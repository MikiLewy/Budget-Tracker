import { useQuery } from '@tanstack/react-query';

import { getTransactions } from '../../api/lib/transactions';
import { transactionsKeys } from '../../api/query-keys/transactions';
import { Transaction } from '../../api/types/transaction';

export const useTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: transactionsKeys.list(),
    queryFn: getTransactions,
  });
};
