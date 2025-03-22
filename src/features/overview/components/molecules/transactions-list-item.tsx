import { ReactNode } from 'react';

import { formatPrice } from '@/utils/format-price';

interface Props {
  name: string;
  categoryName: string;
  amount: number;
  type: 'expense' | 'income';
  icon: ReactNode;
}

const TransactionsListItem = ({ name, categoryName, amount, type, icon }: Props) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h1 className="text-lg font-bold">{name}</h1>
          <p className="text-sm text-gray-500">{categoryName}</p>
        </div>
      </div>
      <p className="text-lg font-medium">
        {type === 'expense' ? '-' : '+'}
        {formatPrice(amount)}
      </p>
    </div>
  );
};

export default TransactionsListItem;
