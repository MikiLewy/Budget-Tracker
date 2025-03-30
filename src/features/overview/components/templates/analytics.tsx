'use client';

import { useState } from 'react';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/features/transactions/hooks/query/use-transactions';

import ChartDateRangeSelect, { ChartDateRangeOption } from '../atoms/chart-date-range-select';
import UnavailableData from '../atoms/unavailable-data';
import { CategoriesChart } from '../organisms/categories-chart';

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
      <CardContent className="pl-2 flex flex-col grow">
        {transactionsData?.length !== 0 ? (
          <CategoriesChart data={transactionsData || []} />
        ) : (
          <UnavailableData message="No transactions found" />
        )}
      </CardContent>
    </>
  );
};

export default Analytics;
