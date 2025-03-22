'use server';

import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/db';
import { recurringTransactions } from '@/db/schema';
import { getCurrentUserByClerkId } from '@/shared/api/lib/user';
import { TransactionType } from '@/shared/types/transaction-type';

export interface CreateRecurringTransactionPayload {
  name: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  dayOfMonth: number;
}

export const createRecurringTransaction = async ({
  name,
  amount,
  categoryId,
  type,
  dayOfMonth,
}: CreateRecurringTransactionPayload) => {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
      throw new Error('User not found');
    }

    const user = await getCurrentUserByClerkId(clerkUser.id);

    if (!user) {
      throw new Error('User not found');
    }

    await db.insert(recurringTransactions).values({
      name,
      amount,
      type,
      categoryId,
      dayOfMonth,
      created_at: new Date(),
      updated_at: new Date(),
      userId: user.id,
    });
  } catch (error) {
    return {
      error: 'Failed to create recurring transaction',
    };
  }
};
