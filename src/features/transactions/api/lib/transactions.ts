import { between, desc } from 'drizzle-orm';

import { db } from '@/db';
import { transactions } from '@/db/schema';

import { TransactionsPayload } from '../../hooks/query/use-transactions';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const DATE_RANGES = {
  '30': 30 * DAY_IN_MS,
  '7': 7 * DAY_IN_MS,
} as const;

export const getTransactions = async (payload: TransactionsPayload = {}) => {
  const { limit, dateRange } = payload;

  const response = await db.query.transactions.findMany({
    with: {
      category: {
        columns: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
    limit,
    where:
      dateRange !== 'all' && !!dateRange
        ? between(
            transactions.created_at,
            new Date(Date.now() - DATE_RANGES[dateRange as keyof typeof DATE_RANGES]),
            new Date(),
          )
        : undefined,

    orderBy: [desc(transactions.created_at)],
  });

  return response;
};
