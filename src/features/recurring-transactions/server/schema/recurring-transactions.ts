import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, real, text, timestamp } from 'drizzle-orm/pg-core';

import { timestamps } from '@/db/constants/timestamps';
import { categories, users } from '@/db/schema';
import { TransactionType } from '@/shared/types/transaction-type';

export const recurringTransactions = pgTable('recurring_transactions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  amount: real('amount').notNull(),
  type: text('type').$type<TransactionType>().notNull(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  categoryId: text('category_id').references(() => categories.id, { onDelete: 'cascade' }),
  dayOfMonth: integer('day_of_month').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  lastExecuted: timestamp('last_executed'),
  ...timestamps,
});

export const recurringTransactionsRelations = relations(recurringTransactions, ({ one }) => ({
  user: one(users, {
    fields: [recurringTransactions.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [recurringTransactions.categoryId],
    references: [categories.id],
  }),
}));
