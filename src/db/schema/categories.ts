import { pgTable, text } from 'drizzle-orm/pg-core';

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
