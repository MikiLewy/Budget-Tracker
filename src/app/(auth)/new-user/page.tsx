import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { users } from '@/db/schema';

const createUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser?.id) {
    redirect('/sign-in');
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkUser.id || ''),
  });

  if (!existingUser) {
    await db.insert(users).values({
      clerkId: clerkUser.id,
      email: clerkUser?.emailAddresses?.[0]?.emailAddress || '',
    });
  }

  redirect('/overview');
};

const NewUserPage = async () => {
  await createUser();

  return <div>Loading...</div>;
};

export default NewUserPage;
