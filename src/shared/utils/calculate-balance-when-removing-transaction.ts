import { TransactionType } from '@/features/transactions/api/types/transaction';

export const calculateBalanceWhenRemovingTransaction = (type: TransactionType, balance: number, amount: number) => {
  if (type === 'income') {
    return balance - amount;
  }
  return balance + amount;
};
