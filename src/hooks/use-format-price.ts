import { useCurrentUser } from '@/shared/hooks/query/use-current-user';

interface ReturnType {
  formatPrice: (amount: number, language?: string) => string;
}

export const useFormatPrice = (): ReturnType => {
  const { data: userData } = useCurrentUser();

  const currency = userData?.currency || 'EUR';

  const formatPrice = (amount: number, language: string = 'pl') => {
    const formatter = new Intl.NumberFormat(language, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });

    return formatter.format(amount);
  };

  return { formatPrice };
};
