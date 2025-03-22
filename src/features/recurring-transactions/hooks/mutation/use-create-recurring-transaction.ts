import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { recurringTransactionsKeys } from '../../api/query-keys/recurring-transactions';
import {
  createRecurringTransaction,
  CreateRecurringTransactionPayload,
} from '../../server/actions/create-recurring-transaction';

import { currentUserKeys } from '@/shared/api/query-keys/current-user';

export const useCreateRecurringTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createRecurringTransactionPayload: CreateRecurringTransactionPayload) =>
      createRecurringTransaction(createRecurringTransactionPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recurringTransactionsKeys.all });
      queryClient.invalidateQueries({ queryKey: currentUserKeys.all });

      toast.success('Successfully created recurring transaction');
    },
    onError: () => {
      toast.error('Failed to create recurring transaction');
    },
  });
};
