'use server';

import { auth } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { recurringTransactions } from '@/db/schema';
import { getCurrentUserByClerkId } from '@/shared/api/lib/user';

export const getRecurringTransactions = async () => {
  const { userId } = await auth();

  const user = await getCurrentUserByClerkId(userId || '');

  const response = await db.query.recurringTransactions.findMany({
    with: {
      category: {
        columns: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
    orderBy: [desc(recurringTransactions.updated_at)],
    where: eq(recurringTransactions.userId, user?.id || ''),
  });

  return response;
};
