'use server';

import { Pool } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-serverless';

import { transactions, users } from '@/db/schema';
import { getCurrentUserByClerkId } from '@/shared/api/lib/user';
import { TransactionType } from '@/shared/types/transaction-type';
import { calculateBalanceBasedOnTransactionType } from '@/shared/utils/calculate-balance-based-on-transaction-type';

export interface CreateTransactionPayload {
  name: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: Date;
  userId: string;
  recurring?: boolean;
}

export const createTransaction = async ({
  name,
  amount,
  categoryId,
  date,
  type,
  userId,
  recurring = false,
}: CreateTransactionPayload) => {
  try {
    const user = await getCurrentUserByClerkId(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const pool = new Pool({
      connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    });

    const dbPool = drizzle(pool);

    const newBalance = calculateBalanceBasedOnTransactionType({
      transactionType: type,
      amount: amount,
      balance: user.balance,
    });

    await dbPool.transaction(async tx => {
      await tx.insert(transactions).values({
        name,
        amount,
        type,
        categoryId,
        created_at: date,
        userId: user.id,
        updated_at: new Date(),
        recurring,
      });
      await tx.update(users).set({ balance: newBalance }).where(eq(users.id, user.id));
    });
  } catch (error) {
    return {
      error: 'Failed to create transaction',
    };
  }
};
