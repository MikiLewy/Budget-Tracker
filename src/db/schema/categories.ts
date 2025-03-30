import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

import { transactions } from '@/features/transactions/server/schema/transactions';
import { CategoryType } from '@/types/enum/category-type';

import { timestamps } from '../constants/timestamps';

export const categories = pgTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  type: text('type').$type<CategoryType>().notNull(),
  ...timestamps,
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));
