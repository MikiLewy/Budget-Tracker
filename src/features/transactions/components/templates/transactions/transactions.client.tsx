'use client';

import { useCallback, useState } from 'react';

import {
  getTransactionsTableColumns,
  TransactionsActionSlotPayload,
} from '../../../utils/get-transactions-table-columns';
import { TransactionsTable } from '../../organisms/transactions-table';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { useTransactions } from '@/features/transactions/hooks/query/use-transactions';
import { CategoryType } from '@/types/enum/category-type';

const ClientTransactions = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsActionSlotPayload | null>(null);

  const { data: transactions } = useTransactions();

  const actionsSlot = useCallback((payload: TransactionsActionSlotPayload) => {
    const actions = [
      {
        key: 'edit',
        label: 'Edit',
        onClick: () => {
          setSelectedTransaction(payload);
          // handleOpenUpdateTransactionDialog();
        },
      },
      {
        key: 'delete',
        label: 'Remove',
        onClick: () => {
          setSelectedTransaction(payload);
          // handleOpenRemoveTransactionDialog();
        },
      },
    ];

    return <ActionsTableMenu actions={actions} />;
  }, []);

  const columns = getTransactionsTableColumns(actionsSlot);

  const categoriesFilters = Object.values(CategoryType).map(type => ({
    label: transactionsCategoriesTypes[type].label,
    value: type,
    icon: transactionsCategoriesTypes[type].icon,
  }));

  return (
    <>
      <TransactionsTable columns={columns} data={transactions || []} categoriesFilters={categoriesFilters} />
    </>
  );
};

export default ClientTransactions;
