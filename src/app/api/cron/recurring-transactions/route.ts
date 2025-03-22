import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { db } from '@/db';
import { recurringTransactions } from '@/db/schema';
import { createTransaction } from '@/features/transactions/server/actions/create-transaction';

async function handler() {
  try {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    const transactionsToProcess = await db.query.recurringTransactions.findMany({
      where: eq(recurringTransactions.dayOfMonth, currentDay),
      with: {
        user: {
          columns: {
            clerkId: true,
          },
        },
      },
    });

    const results = [];

    for (const transaction of transactionsToProcess) {
      await createTransaction({
        name: transaction.name,
        amount: transaction.amount,
        categoryId: transaction.categoryId || '',
        userId: transaction.user?.clerkId || '',
        date: new Date(),
        type: transaction.type,
      });

      await db
        .update(recurringTransactions)
        .set({
          lastExecuted: new Date(),
          updated_at: new Date(),
        })
        .where(eq(recurringTransactions.id, transaction.id));

      results.push({
        recurringTransactionId: transaction.id,
      });
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error('Error processing recurring transactions:', error);
    return NextResponse.json({ error: 'Failed to process transactions' }, { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler);
