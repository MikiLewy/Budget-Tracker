'use server';

import { currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

import { recurringTransactions } from '../schema/recurring-transactions';

import { db } from '@/db';
import { getCurrentUserByClerkId } from '@/shared/api/lib/user';

export const removeRecurringTransaction = async (id: string) => {
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
      .delete(recurringTransactions)
      .where(and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, user.id)));
  } catch (error) {
    return {
      error: 'Failed to remove recurring transaction',
    };
  }
};
