'use client';

import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { Transaction } from '@/features/transactions/api/types/transaction';
import { useTransactions } from '@/features/transactions/hooks/query/use-transactions';
import { CategoryType } from '@/types/enum/category-type';

import TransactionsListItem from '../molecules/transactions-list-item';

const TransactionsList = () => {
  const { data: transactionsData } = useTransactions({ limit: 7 });

  const transactionsByDates =
    transactionsData?.reduce(
      (acc, transaction) => {
        const date = transaction.created_at.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
      },
      {} as Record<string, Transaction[]>,
    ) || [];

  return (
    <div className="flex flex-col grow justify-between gap-2">
      {Object.entries(transactionsByDates).map(([date, transactions]) => (
        <div key={date} className="flex flex-col gap-2">
          <h2 className="text-sm text-muted-foreground">{date}</h2>
          {transactions.map(transaction => {
            const Icon = transactionsCategoriesTypes[transaction.category?.type || CategoryType.EDUCATION].icon;

            return (
              <TransactionsListItem
                key={transaction.id}
                name={transaction.name}
                categoryName={transaction.category?.name || ''}
                amount={transaction.amount}
                type={transaction.type}
                icon={<Icon size={22} className=" text-white dark:text-black" />}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;
