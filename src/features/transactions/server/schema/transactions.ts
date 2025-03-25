import { relations } from 'drizzle-orm';
import { boolean, pgTable, real, text } from 'drizzle-orm/pg-core';

import { timestamps } from '@/db/constants/timestamps';
import { categories, users } from '@/db/schema';
import { TransactionType } from '@/shared/types/transaction-type';

export const transactions = pgTable('transactions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  amount: real('amount').notNull(),
  type: text('type').$type<TransactionType>().notNull(),
  recurring: boolean('recurring').notNull().default(false),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  categoryId: text('category_id').references(() => categories.id, { onDelete: 'cascade' }),
  ...timestamps,
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));
