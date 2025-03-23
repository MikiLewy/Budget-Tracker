import { Currency } from '@/types/currency';

export const currencies: {
  value: Currency;
  sign: string;
}[] = [
  {
    value: 'PLN',
    sign: 'zł',
  },
  {
    value: 'USD',
    sign: '$',
  },
  {
    value: 'EUR',
    sign: '€',
  },
];
