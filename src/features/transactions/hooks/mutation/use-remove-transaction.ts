import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { transactionsKeys } from '../../api/query-keys/transactions';
import { removeTransaction } from '../../server/actions/remove-transaction';

import { currentUserKeys } from '@/shared/api/query-keys/current-user';

export const useRemoveTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
      queryClient.invalidateQueries({ queryKey: currentUserKeys.all });
      toast.success('Successfully removed transaction');
    },
    onError: () => {
      toast.error('Failed to remove transaction');
    },
  });
};
