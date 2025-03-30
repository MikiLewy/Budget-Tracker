'use client';

import { Separator } from '@/components/ui/separator';
import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { Transaction } from '@/features/transactions/api/types/transaction';
import { useTransactions } from '@/features/transactions/hooks/query/use-transactions';
import { CategoryType } from '@/types/enum/category-type';

import TransactionListItemSkeleton from '../atoms/transaction-list-item-skeleton';
import UnavailableData from '../atoms/unavailable-data';
import TransactionsListItem from '../molecules/transactions-list-item';

const TransactionsList = () => {
  const { data: transactionsData, isLoading } = useTransactions({ limit: 7 });

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

  if (isLoading) {
    return (
      <div className="flex flex-col grow items-center justify-start gap-6 mt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <TransactionListItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (transactionsData?.length === 0) {
    return <UnavailableData message="No transactions found" />;
  }

  return (
    <div className="flex flex-col grow gap-2">
      {Object.entries(transactionsByDates).map(([date, transactions], i) => (
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
          {i !== Object.entries(transactionsByDates).length - 1 ? <Separator className="my-2" /> : null}
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;
