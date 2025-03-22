'use client';

import { useState } from 'react';

import ChartDateRangeSelect, { ChartDateRangeOption } from '../atoms/chart-date-range-select';
import { CategoriesChart } from '../organisms/categories-chart';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/features/transactions/hooks/query/use-transactions';

const Analytics = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<ChartDateRangeOption>('all');

  const { data: transactionsData } = useTransactions({ dateRange: selectedDateRange });

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Financial overview
          <ChartDateRangeSelect value={selectedDateRange} onChange={setSelectedDateRange} />
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <CategoriesChart data={transactionsData || []} />
      </CardContent>
    </>
  );
};

export default Analytics;
