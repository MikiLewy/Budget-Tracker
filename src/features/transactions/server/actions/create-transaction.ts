'server-only';

import { TransactionType } from '../../api/types/transaction';
import { transactions } from '../schema/transactions';

import { db } from '@/db';

export interface CreateTransactionPayload {
  name: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: Date;
}

export const createTransaction = async ({ name, amount, categoryId, date, type }: CreateTransactionPayload) => {
  try {
    await db.insert(transactions).values({
      name,
      amount,
      type,
      categoryId,
      created_at: date,
    });
  } catch (error) {
    return {
      error: 'Failed to create transaction',
    };
  }
};
