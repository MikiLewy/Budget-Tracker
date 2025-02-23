import { pgTable, text } from 'drizzle-orm/pg-core';

import { timestamps } from '../constants/timestamps';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text('email').unique(),
  clerkId: text('clerkId').unique(),
  ...timestamps,
});
