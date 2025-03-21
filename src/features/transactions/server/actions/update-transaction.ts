'use server';

import { currentUser } from '@clerk/nextjs/server';
import { Pool } from '@neondatabase/serverless';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-serverless';

import { db } from '@/db';
import { users } from '@/db/schema';
import { getCurrentUserByClerkId } from '@/shared/api/lib/user';
import { calculateBalanceBasedOnTransactionType } from '@/shared/utils/calculate-balance-based-on-transaction-type';
import { calculateDifferenceInAmount } from '@/shared/utils/calculate-difference-in-amount';
import { calculateInitialBalanceBasedOnTransactionType } from '@/shared/utils/calculate-initial-balance-based-on-transaction-type';

import { TransactionType } from '../../api/types/transaction';
import { transactions } from '../schema/transactions';

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

    const transaction = await db.query.transactions.findFirst({
      where: and(eq(transactions.id, id), eq(transactions.userId, user.id)),
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const differenceInAmount = calculateDifferenceInAmount({ oldAmount: transaction.amount, newAmount: amount });

    const newBalance = calculateBalanceBasedOnTransactionType({
      transactionType: type,
      amount: differenceInAmount,
      balance: calculateInitialBalanceBasedOnTransactionType({
        oldType: transaction?.type,
        newType: type,
        balance: user.balance,
        amount: transaction?.amount,
      }),
    });

    await dbPool.transaction(async tx => {
      await tx
        .update(transactions)
        .set({ amount, categoryId, created_at: date, updated_at: new Date(), name, type, userId: user.id })
        .where(and(eq(transactions.id, id), eq(transactions.userId, user.id)));
      await tx.update(users).set({ balance: newBalance }).where(eq(users.id, user.id));
    });
  } catch (error) {
    return {
      error: 'Failed to update transaction',
    };
  }
};
