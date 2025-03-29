'use client';

import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { useRemoveRecurringTransaction } from '@/features/recurring-transactions/hooks/mutation/use-remove-recurring-transaction';

interface Props extends DialogActions {
  selectedTransactionId: string;
}

const RemoveRecurringTransactionDialog = ({ open, onClose, selectedTransactionId }: Props) => {
  const { mutateAsync, isPending } = useRemoveRecurringTransaction();

  const onSubmit = async () => {
    await mutateAsync(selectedTransactionId, { onSuccess: onClose });
  };

  return (
    <Dialog
      title="Remove recurring transaction"
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitButtonLoading={isPending}
      isSubmitButtonDisabled={!selectedTransactionId}
      confirmButtonText="Yes, remove"
      scrollable>
      <p>Are you sure you want to remove this recurring transaction?</p>
    </Dialog>
  );
};

export default RemoveRecurringTransactionDialog;
