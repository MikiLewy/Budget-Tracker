import { relations } from 'drizzle-orm';
import { pgTable, real, text } from 'drizzle-orm/pg-core';

import { recurringTransactions } from '@/features/recurring-transactions/server/schema/recurring-transactions';
import { transactions } from '@/features/transactions/server/schema/transactions';

import { timestamps } from '../constants/timestamps';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text('email').unique(),
  clerkId: text('clerkId').unique(),
  balance: real('balance').default(0).notNull(),
  ...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
  recurringTransactions: many(recurringTransactions),
}));
