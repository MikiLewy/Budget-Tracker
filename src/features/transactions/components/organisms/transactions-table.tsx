'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';

import SearchBar from '@/components/molecules/search-bar';
import { Table } from '@/components/organisms/table/table';
import { TableFacetedFilter } from '@/components/organisms/table/table-faceted-filters';
import { TablePagination } from '@/components/organisms/table/table-pagination';
import { TableViewOptions } from '@/components/organisms/table/table-view-options';
import { Button } from '@/components/ui/button';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  categoriesFilters: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }[];
}

export function TransactionsTable<TData, TValue>({ columns, data, categoriesFilters }: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  const transactionTypesFilters: { label: string; value: string }[] = [
    { label: 'Expenses', value: 'expense' },
    { label: 'Income', value: 'income' },
  ];

  return (
    <div className="flex flex-col grow gap-6">
      <div className="flex items-center py-4 gap-2">
        <SearchBar
          query={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          handleChangeQuery={value => table.getColumn('name')?.setFilterValue(value)}
        />
        <div className="flex items-center gap-2">
          {table.getColumn('type') ? (
            <TableFacetedFilter column={table.getColumn('type')} title="Type" options={transactionTypesFilters} />
          ) : null}
          {table.getColumn('category') ? (
            <TableFacetedFilter column={table.getColumn('category')} title="Category" options={categoriesFilters} />
          ) : null}
          {isFiltered ? (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="text-sm px-2 lg:px-3">
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
        <TableViewOptions table={table} />
      </div>
      <Table columnsLength={columns.length} table={table} />
      <TablePagination table={table} />
    </div>
  );
}
