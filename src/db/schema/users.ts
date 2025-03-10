import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

import { transactions } from '@/features/transactions/server/schema/transactions';

import { timestamps } from '../constants/timestamps';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text('email').unique(),
  clerkId: text('clerkId').unique(),
  ...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
}));
