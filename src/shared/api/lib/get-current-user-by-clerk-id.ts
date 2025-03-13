import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';

export const getCurrentUserByClerkId = async (clerkId: string) => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });

  return existingUser;
};
