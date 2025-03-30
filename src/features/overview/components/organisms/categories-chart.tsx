'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Transaction } from '@/features/transactions/api/types/transaction';

const chartConfig = {
  expense: {
    label: 'Expense',
    color: '#8458DB',
  },
  income: {
    label: 'Income',
    color: '#5958DB',
  },
} satisfies ChartConfig;

interface Props {
  data: Transaction[];
}

export function CategoriesChart({ data }: Props) {
  const balanceTotalsByCategory =
    data?.reduce<
      Record<
        string,
        {
          expense: number;
          income: number;
        }
      >
    >((acc, transaction) => {
      const category = transaction.category;

      if (!category) return acc;

      if (transaction.type === 'expense') {
        acc[category.name] = {
          ...acc[category.name],
          expense: (acc[category.name]?.expense || 0) + transaction.amount,
        };
      } else {
        acc[category.name] = {
          ...acc[category.name],
          income: (acc[category.name]?.income || 0) + transaction.amount,
        };
      }

      return acc;
    }, {}) || [];

  const chartData = Object.entries(balanceTotalsByCategory).map(([category, balanceTotals]) => ({
    category,
    expense: balanceTotals?.expense || 0,
    income: balanceTotals?.income || 0,
  }));

  return (
    <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="category" tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
