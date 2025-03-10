import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

import { Transaction, TransactionType } from '../api/types/transaction';

import { FormatDate } from '@/components/atoms/format-date';
import { TableColumnHeader } from '@/components/organisms/table/table-column-header';
import { Badge } from '@/components/ui/badge';
import { dateFormats } from '@/constants/date-formats';
import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { CategoryType } from '@/types/enum/category-type';

export interface TransactionsActionSlotPayload {
  id: string;
  type: TransactionType;
}

export const getTransactionsTableColumns = (actionsSlot: (payload: TransactionsActionSlotPayload) => ReactNode) => {
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'name',
      meta: 'name',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Name" />;
      },
    },
    {
      accessorKey: 'amount',
      meta: 'amount',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Amount" />;
      },
      cell: ({ getValue }) => {
        return <p>€{getValue() as string}</p>;
      },
    },
    {
      accessorKey: 'type',
      meta: 'type',
      enableHiding: false,
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Type" />;
      },
      cell: ({ getValue }) => {
        const type = getValue() as TransactionType;

        return (
          <Badge variant={type === 'income' ? 'success' : 'destructive'} className="capitalize">
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'category',
      meta: 'category',
      enableHiding: false,
      filterFn: (rows, columnId, filterValue) => {
        const category = rows.getValue(columnId) as { id: string; name: string; type: CategoryType };

        return filterValue.includes(category.type.toString());
      },
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Category" />;
      },
      cell: ({ cell }) => {
        const category = cell.getValue() as { id: string; name: string; type: CategoryType };

        const Icon = transactionsCategoriesTypes[category.type]?.icon;

        return (
          <span className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            <span>{category.name}</span>
          </span>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      meta: 'Created at',
      header: ({ column }) => {
        return <TableColumnHeader column={column} title="Date" />;
      },
      cell: ({ getValue }) => {
        return (
          <FormatDate
            date={new Date((getValue() as string) ?? new Date())}
            format={`${dateFormats.day}.${dateFormats.month}.${dateFormats.year}`}
          />
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const transaction = row.original;

        return actionsSlot({
          id: transaction.id,
          type: transaction.type,
        });
      },
    },
  ];

  return columns;
};
