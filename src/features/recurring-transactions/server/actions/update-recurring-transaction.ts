'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { recurringTransactions } from '@/db/schema';
import { getCurrentUserByClerkId } from '@/shared/api/lib/user';
import { TransactionType } from '@/shared/types/transaction-type';

export interface UpdateRecurringTransactionPayload {
  id: string;
  amount: number;
  categoryId: string;
  dayOfMonth: number;
  name: string;
  type: TransactionType;
}

export const updateRecurringTransaction = async ({
  id,
  amount,
  categoryId,
  dayOfMonth,
  name,
  type,
}: UpdateRecurringTransactionPayload) => {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
      throw new Error('User not found');
    }

    const user = await getCurrentUserByClerkId(clerkUser.id);

    if (!user) {
      throw new Error('User not found');
    }

    const recurringTransaction = await db.query.recurringTransactions.findFirst({
      where: and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, user.id)),
    });

    if (!recurringTransaction) {
      throw new Error('Recurring transaction not found');
    }

    await db
      .update(recurringTransactions)
      .set({ amount, categoryId, dayOfMonth, updated_at: new Date(), name, type, userId: user.id })
      .where(and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, user.id)));
  } catch (error) {
    return {
      error: 'Failed to update recurring transaction',
    };
  }
};
