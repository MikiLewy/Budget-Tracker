import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { getCurrentUserByClerkId } from '@/shared/api/lib/user';
import { currentUserKeys } from '@/shared/api/query-keys/current-user';

export const useCurrentUser = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: currentUserKeys.detail(user?.id || ''),
    queryFn: () => getCurrentUserByClerkId(user?.id || ''),
    enabled: !!user?.id,
  });
};
