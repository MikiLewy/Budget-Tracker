import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { transactionsKeys } from '../../api/query-keys/transactions';
import { createTransaction, CreateTransactionPayload } from '../../server/actions/create-transaction';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createTransactionPayload: CreateTransactionPayload) => createTransaction(createTransactionPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
      toast.success('Successfully created transaction');
    },
    onError: () => {
      toast.error('Failed to create transaction');
    },
  });
};
