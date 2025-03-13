import { eq } from 'drizzle-orm';

import { TransactionType } from '../../api/types/transaction';
import { transactions } from '../schema/transactions';

import { db } from '@/db';

export interface UpdateTransactionPayload {
  id: string;
  amount: number;
  categoryId: string;
  date: Date;
  name: string;
  type: TransactionType;
}

export const updateTransaction = async ({ id, amount, categoryId, date, name, type }: UpdateTransactionPayload) => {
  try {
    await db
      .update(transactions)
      .set({ amount, categoryId, created_at: date, updated_at: new Date(), name, type })
      .where(eq(transactions.id, id));
  } catch (error) {
    return {
      error: 'Failed to update transaction',
    };
  }
};
