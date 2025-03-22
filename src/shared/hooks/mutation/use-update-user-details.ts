import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { currentUserKeys } from '@/shared/api/query-keys/current-user';
import { updateUserDetails } from '@/shared/server/actions/update-user-details';

export const useUpdateUserDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (balance: number) => updateUserDetails(balance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currentUserKeys.all });
      toast.success('Successfully updated budget');
    },
    onError: () => {
      toast.error('Failed to update budget');
    },
  });
};
