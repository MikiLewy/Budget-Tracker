import { TransactionType } from '@/shared/types/transaction-type';

export const calculateBalanceWhenRemovingTransaction = (type: TransactionType, balance: number, amount: number) => {
  if (type === 'income') {
    return balance - amount;
  }
  return balance + amount;
};
