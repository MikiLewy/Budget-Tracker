import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { users } from '@/db/schema';
import { getCurrentUserByClerkId } from '@/shared/api/lib/user';

const createUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser?.id) {
    redirect('/sign-in');
  }

  const existingUser = await getCurrentUserByClerkId(clerkUser.id);

  if (!existingUser) {
    await db.insert(users).values({
      clerkId: clerkUser.id,
      email: clerkUser?.emailAddresses?.[0]?.emailAddress || '',
    });
  }

  redirect('/overview');
};

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const NewUserPage = async () => {
  await createUser();

  return <div>Loading...</div>;
};

export default NewUserPage;
