import { TransactionType } from '@/features/transactions/api/types/transaction';

type Payload = {
  oldType: TransactionType;
  newType: TransactionType;
  balance: number;
  amount: number;
};

export const calculateInitialBalanceBasedOnTransactionType = ({ oldType, newType, balance, amount }: Payload) => {
  switch (true) {
    case oldType === newType:
      return balance;
    case oldType === 'income' && newType === 'expense':
      return balance - amount * 2;
    case oldType === 'expense' && newType === 'income':
      return balance + amount * 2;
    default:
      return balance;
  }
};
