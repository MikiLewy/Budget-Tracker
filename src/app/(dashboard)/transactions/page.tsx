import { Metadata } from 'next';

import { Transactions } from '@/features/transactions/components/templates/transactions';

export const metadata: Metadata = {
  title: 'Transactions',
  description:
    'Keep track of all your income and expenses. Easily add, edit, and categorize transactions to maintain full control over your financial activity.',
};

const TransactionsPage = () => {
  return <Transactions />;
};

export default TransactionsPage;
