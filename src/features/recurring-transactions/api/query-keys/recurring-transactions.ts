export const recurringTransactionsKeys = {
  all: ['recurring-transactions'] as const,
  lists: () => [...recurringTransactionsKeys.all, 'list'] as const,
  list: () => [...recurringTransactionsKeys.lists()] as const,
};
