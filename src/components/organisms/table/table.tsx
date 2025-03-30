'use client';

import { flexRender, Table as TableInterface } from '@tanstack/react-table';

import { Table as DataTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableProps<TData> {
  columnsLength: number;
  table: TableInterface<TData>;
}

export function Table<TData>({ columnsLength, table }: TableProps<TData>) {
  return (
    <div className="rounded-md border ">
      <DataTable>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className={cell.column.id === 'actions' ? 'text-right' : ''}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsLength} className="h-24 text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </DataTable>
    </div>
  );
}
