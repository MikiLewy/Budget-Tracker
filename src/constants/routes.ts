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
    key: 'cyclic-transactions',
    label: 'Cyclic transactions',
    href: '/cyclic-transactions',
  },
  {
    key: 'settings',
    label: 'Settings',
    href: '/settings',
  },
];
