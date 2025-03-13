'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';

import CreateTransactionDialog from './dialogs/create-transaction-dialog/create-transaction-dialog';

const TransactionsPageHeaderActions = () => {
  const [isOpenCreateTransactionDialog, handleOpenCreateTransactionDialog, handleCloseCreateTransactionDialog] =
    useDialog();

  return (
    <>
      <Button onClick={handleOpenCreateTransactionDialog}>
        <Plus className="mr h-4 w-4" />
        Create transaction
      </Button>
      <CreateTransactionDialog open={isOpenCreateTransactionDialog} onClose={handleCloseCreateTransactionDialog} />
    </>
  );
};

export default TransactionsPageHeaderActions;
