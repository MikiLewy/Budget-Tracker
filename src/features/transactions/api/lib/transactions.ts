import { desc } from 'drizzle-orm';

import { db } from '@/db';
import { transactions } from '@/db/schema';

export const getTransactions = async () => {
  const response = await db.query.transactions.findMany({
    with: {
      category: {
        columns: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
    orderBy: [desc(transactions.created_at)],
  });

  return response;
};

export const createTransaction = async () => {
  //  await db.insert(transactions).values();
};
