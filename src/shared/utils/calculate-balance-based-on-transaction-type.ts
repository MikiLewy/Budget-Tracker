import { TransactionType } from '@/shared/types/transaction-type';

type Payload = {
  transactionType: TransactionType;
  balance: number;
  amount: number;
};

export const calculateBalanceBasedOnTransactionType = ({ transactionType, balance, amount }: Payload): number => {
  switch (transactionType) {
    case 'income':
      return balance + amount;
    case 'expense':
      return balance - amount;
    default:
      return balance;
  }
};
