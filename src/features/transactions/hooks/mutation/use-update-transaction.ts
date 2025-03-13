import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { transactionsKeys } from '../../api/query-keys/transactions';
import { updateTransaction, UpdateTransactionPayload } from '../../server/actions/update-transaction';

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateTransactionPayload: UpdateTransactionPayload) => updateTransaction(updateTransactionPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
      toast.success('Successfully updated transaction');
    },
    onError: () => {
      toast.error('Failed to update transaction');
    },
  });
};
