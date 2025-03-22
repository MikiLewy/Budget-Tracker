import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { recurringTransactionsKeys } from '../../api/query-keys/recurring-transactions';
import { removeRecurringTransaction } from '../../server/actions/remove-recurring-transaction';

import { currentUserKeys } from '@/shared/api/query-keys/current-user';

export const useRemoveRecurringTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeRecurringTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recurringTransactionsKeys.all });
      queryClient.invalidateQueries({ queryKey: currentUserKeys.all });
      toast.success('Successfully removed recurring transaction');
    },
    onError: () => {
      toast.error('Failed to remove recurring transaction');
    },
  });
};
