'use server';

import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';
import { getCurrentUserByClerkId } from '@/shared/api/lib/user';

export const updateUserDetails = async (balance: number) => {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
      throw new Error('User not found');
    }

    const user = await getCurrentUserByClerkId(clerkUser.id);

    if (!user) {
      throw new Error('User not found');
    }

    await db.update(users).set({ balance }).where(eq(users.id, user.id));
  } catch (error) {
    return {
      error: 'Failed to create transaction',
    };
  }
};
