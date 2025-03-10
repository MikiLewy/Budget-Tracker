export const formatPrice = (amount: number, language: string = 'en', currency: string = 'EUR') => {
  const formatter = new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};
