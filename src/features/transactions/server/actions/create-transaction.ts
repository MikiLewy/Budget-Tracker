'use server';

import { currentUser } from '@clerk/nextjs/server';
import { Pool } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-serverless';

import { TransactionType } from '../../api/types/transaction';

import { transactions, users } from '@/db/schema';
import { getCurrentUserByClerkId } from '@/shared/api/lib/get-current-user-by-clerk-id';
import { calculateBalanceBasedOnTransactionType } from '@/shared/utils/calculate-balance-based-on-transaction-type';

export interface CreateTransactionPayload {
  name: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: Date;
}

export const createTransaction = async ({ name, amount, categoryId, date, type }: CreateTransactionPayload) => {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
      throw new Error('User not found');
    }

    const user = await getCurrentUserByClerkId(clerkUser.id);

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
      });
      await tx.update(users).set({ balance: newBalance }).where(eq(users.id, user.id));
    });
  } catch (error) {
    return {
      error: 'Failed to create transaction',
    };
  }
};
