import { TransactionsPayload } from '@/features/transactions/hooks/query/use-transactions';

export const transactionsKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionsKeys.all, 'list'] as const,
  list: ({ limit, dateRange }: TransactionsPayload = {}) =>
    [...transactionsKeys.lists(), { limit, dateRange }] as const,
};
