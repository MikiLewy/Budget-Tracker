import { desc } from 'drizzle-orm';

import { db } from '@/db';
import { recurringTransactions } from '@/db/schema';

export const getRecurringTransactions = async () => {
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
  });

  return response;
};
