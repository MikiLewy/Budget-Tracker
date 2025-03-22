'use client';

import { Plus } from 'lucide-react';

import CreateRecurringTransactionDialog from './dialogs/create-recurring-transaction-dialog/create-recurring-transaction-dialog';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';

const RecurringTransactionsPageHeaderActions = () => {
  const [
    isOpenCreateRecurringTransactionDialog,
    handleOpenCreateRecurringTransactionDialog,
    handleCloseCreateRecurringTransactionDialog,
  ] = useDialog();

  return (
    <>
      <Button onClick={handleOpenCreateRecurringTransactionDialog}>
        <Plus className="mr h-4 w-4" />
        Create recurring transaction
      </Button>
      <CreateRecurringTransactionDialog
        open={isOpenCreateRecurringTransactionDialog}
        onClose={handleCloseCreateRecurringTransactionDialog}
      />
    </>
  );
};

export default RecurringTransactionsPageHeaderActions;
