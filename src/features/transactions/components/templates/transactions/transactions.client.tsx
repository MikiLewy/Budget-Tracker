'use client';

import { useCallback, useState } from 'react';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { useTransactions } from '@/features/transactions/hooks/query/use-transactions';
import { useDialog } from '@/hooks/use-dialog';
import { CategoryType } from '@/types/enum/category-type';

import {
  getTransactionsTableColumns,
  TransactionsActionSlotPayload,
} from '../../../utils/get-transactions-table-columns';
import RemoveTransactionDialog from '../../organisms/dialogs/remove-transaction-dialog';
import UpdateTransactionDialog from '../../organisms/dialogs/update-transaction-dialog/update-transaction-dialog';
import { TransactionsTable } from '../../organisms/transactions-table';

const ClientTransactions = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsActionSlotPayload | null>(null);

  const { data: transactions } = useTransactions();

  const [isOpenRemoveTransactionDialog, handleOpenRemoveTransactionDialog, handleCloseRemoveTransactionDialog] =
    useDialog();

  const [isOpenUpdateTransactionDialog, handleOpenUpdateTransactionDialog, handleCloseUpdateTransactionDialog] =
    useDialog();

  const actionsSlot = useCallback((payload: TransactionsActionSlotPayload) => {
    const actions = [
      {
        key: 'edit',
        label: 'Edit',
        onClick: () => {
          setSelectedTransaction(payload);
          handleOpenUpdateTransactionDialog();
        },
      },
      {
        key: 'delete',
        label: 'Remove',
        onClick: () => {
          setSelectedTransaction(payload);
          handleOpenRemoveTransactionDialog();
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
      <UpdateTransactionDialog
        open={isOpenUpdateTransactionDialog}
        onClose={handleCloseUpdateTransactionDialog}
        selectedTransactionId={selectedTransaction?.id || ''}
        selectedTransactionName={selectedTransaction?.name || ''}
        selectedTransactionAmount={selectedTransaction?.amount || 0}
        selectedTransactionType={selectedTransaction?.type || 'expense'}
        selectedTransactionCategoryId={selectedTransaction?.categoryId || ''}
        selectedTransactionDate={selectedTransaction?.date || new Date()}
      />
      <RemoveTransactionDialog
        open={isOpenRemoveTransactionDialog}
        onClose={handleCloseRemoveTransactionDialog}
        selectedTransactionId={selectedTransaction?.id || ''}
      />
    </>
  );
};

export default ClientTransactions;
