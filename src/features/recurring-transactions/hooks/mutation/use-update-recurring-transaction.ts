import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { recurringTransactionsKeys } from '../../api/query-keys/recurring-transactions';
import {
  updateRecurringTransaction,
  UpdateRecurringTransactionPayload,
} from '../../server/actions/update-recurring-transaction';

import { currentUserKeys } from '@/shared/api/query-keys/current-user';

export const useUpdateRecurringTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateRecurringTransactionPayload: UpdateRecurringTransactionPayload) =>
      updateRecurringTransaction(updateRecurringTransactionPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recurringTransactionsKeys.all });
      queryClient.invalidateQueries({ queryKey: currentUserKeys.all });

      toast.success('Successfully updated recurring transaction');
    },
    onError: () => {
      toast.error('Failed to update recurring transaction');
    },
  });
};
