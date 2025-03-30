'use client';

import { DollarSignIcon, List, TrendingDown, TrendingUp } from 'lucide-react';

import { useTransactions } from '@/features/transactions/hooks/query/use-transactions';
import { useFormatPrice } from '@/hooks/use-format-price';
import { useCurrentUser } from '@/shared/hooks/query/use-current-user';

import OverviewCard from '../atoms/overview-card';

const Overview = () => {
  const { data: userData } = useCurrentUser();

  const { formatPrice } = useFormatPrice();

  const { data: transactionsData } = useTransactions();

  const balanceTotals = transactionsData?.reduce<{ income: number; expenses: number }>(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        return { ...acc, income: acc.income + transaction.amount };
      }
      return { ...acc, expenses: acc.expenses + transaction.amount };
    },
    { income: 0, expenses: 0 },
  );

  const totalTransactions = transactionsData?.length || 0;

  const overviewCards: {
    key: string;
    title: string;
    icon: React.ReactNode;
    value: string | number;
    caption?: string;
  }[] = [
    {
      key: 'balance',
      title: 'Balance',
      icon: <DollarSignIcon size={14} />,
      value: formatPrice(userData?.balance || 0),
    },
    {
      key: 'income',
      title: 'Income',
      icon: <TrendingUp size={14} />,
      value: formatPrice(balanceTotals?.income || 0),
    },
    {
      key: 'expenses',
      title: 'Expenses',
      icon: <TrendingDown size={14} />,
      value: formatPrice(balanceTotals?.expenses || 0),
    },
    {
      key: 'total-transactions',
      title: 'Total transactions',
      icon: <List size={14} />,
      value: totalTransactions,
    },
  ];

  return overviewCards.map(card => <OverviewCard {...card} key={card.key} />);
};

export default Overview;
