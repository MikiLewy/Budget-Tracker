'use client';

import { useCallback, useState } from 'react';

import ActionsTableMenu from '@/components/atoms/actions-table-menu';
import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { useRecurringTransactions } from '@/features/recurring-transactions/hooks/query/use-recurring-transactions';
import { RecurringTransactionsActionSlotPayload } from '@/features/recurring-transactions/hooks/use-recurring-transactions-table-columns';
import { useGetRecurringTransactionsTableColumns } from '@/features/recurring-transactions/hooks/use-recurring-transactions-table-columns';
import { useDialog } from '@/hooks/use-dialog';
import { CategoryType } from '@/types/enum/category-type';

import RemoveRecurringTransactionDialog from '../../organisms/dialogs/remove-recurring-transaction-dialog';
import UpdateRecurringTransactionDialog from '../../organisms/dialogs/update-recurring-transaction-dialog/update-recurring-transaction-dialog';
import { RecurringTransactionsTable } from '../../organisms/recurring-transactions-table';

const ClientRecurringTransactions = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<RecurringTransactionsActionSlotPayload | null>(null);

  const { data: recurringTransactionsData } = useRecurringTransactions();

  const [isOpenRemoveTransactionDialog, handleOpenRemoveTransactionDialog, handleCloseRemoveTransactionDialog] =
    useDialog();

  const [isOpenUpdateTransactionDialog, handleOpenUpdateTransactionDialog, handleCloseUpdateTransactionDialog] =
    useDialog();

  const actionsSlot = useCallback((payload: RecurringTransactionsActionSlotPayload) => {
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

  const columns = useGetRecurringTransactionsTableColumns(actionsSlot);

  const categoriesFilters = Object.values(CategoryType).map(type => ({
    label: transactionsCategoriesTypes[type].label,
    value: type,
    icon: transactionsCategoriesTypes[type].icon,
  }));

  return (
    <>
      <RecurringTransactionsTable
        columns={columns}
        data={recurringTransactionsData || []}
        categoriesFilters={categoriesFilters}
      />
      <UpdateRecurringTransactionDialog
        open={isOpenUpdateTransactionDialog}
        onClose={handleCloseUpdateTransactionDialog}
        selectedTransactionId={selectedTransaction?.id || ''}
        selectedTransactionName={selectedTransaction?.name || ''}
        selectedTransactionAmount={selectedTransaction?.amount || 0}
        selectedTransactionType={selectedTransaction?.type || 'expense'}
        selectedTransactionCategoryId={selectedTransaction?.categoryId || ''}
        selectedTransactionDayOfMonth={selectedTransaction?.dayOfMonth || 1}
      />
      <RemoveRecurringTransactionDialog
        open={isOpenRemoveTransactionDialog}
        onClose={handleCloseRemoveTransactionDialog}
        selectedTransactionId={selectedTransaction?.id || ''}
      />
    </>
  );
};

export default ClientRecurringTransactions;
