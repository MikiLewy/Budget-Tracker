'use server';

import { currentUser } from '@clerk/nextjs/server';
import { Pool } from '@neondatabase/serverless';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-serverless';

import { transactions } from '../schema/transactions';

import { db } from '@/db';
import { users } from '@/db/schema/users';
import { getCurrentUserByClerkId } from '@/shared/api/lib/get-current-user-by-clerk-id';
import { calculateBalanceWhenRemovingTransaction } from '@/shared/utils/calculate-balance-when-removing-transaction';

export const removeTransaction = async (id: string) => {
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

    const newBalance = calculateBalanceWhenRemovingTransaction(transaction?.type, user.balance, transaction?.amount);

    await dbPool.transaction(async tx => {
      await tx.delete(transactions).where(and(eq(transactions.id, id), eq(transactions.userId, user.id)));
      await tx.update(users).set({ balance: newBalance }).where(eq(users.id, user.id));
    });
  } catch (error) {
    return {
      error: 'Failed to remove transaction',
    };
  }
};
