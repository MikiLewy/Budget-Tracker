import { eq } from 'drizzle-orm';

import { transactions } from '../schema/transactions';

import { db } from '@/db';

export const removeTransaction = async (id: string) => {
  try {
    await db.delete(transactions).where(eq(transactions.id, id));
  } catch (error) {
    return {
      error: 'Failed to remove transaction',
    };
  }
};
