import { currentUser } from '@clerk/nextjs/server';
import { QueryClient } from '@tanstack/react-query';

import { currentUserKeys } from '../query-keys/current-user';

import { getCurrentUserByClerkId } from './user';

export const prefetchUser = async (queryClient: QueryClient) => {
  const user = await currentUser();

  return queryClient.prefetchQuery({
    queryKey: currentUserKeys.detail(user?.id ?? ''),
    queryFn: () => getCurrentUserByClerkId(user?.id ?? ''),
  });
};
