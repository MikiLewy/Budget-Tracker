import { Route } from '@/types/route';

export const routes: Route[] = [
  {
    key: 'overview',
    label: 'Overview',
    href: '/overview',
  },
  {
    key: 'transactions',
    label: 'Transactions',
    href: '/transactions',
  },
  {
    key: 'recurring-transactions',
    label: 'Recurring transactions',
    href: '/recurring-transactions',
  },
  {
    key: 'settings',
    label: 'Settings',
    href: '/settings',
  },
];
