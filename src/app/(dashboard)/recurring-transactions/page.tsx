import { Metadata } from 'next';

import { RecurringTransactions } from '@/features/recurring-transactions/components/templates/recurring-transactions';

export const metadata: Metadata = {
  title: 'Recurring Transactions',
  description:
    'Automate your finances with recurring transactions. Set up subscriptions, bills, and regular expenses to simplify your money management.',
};

const RecurringTransactionsPage = () => {
  return <RecurringTransactions />;
};

export default RecurringTransactionsPage;
