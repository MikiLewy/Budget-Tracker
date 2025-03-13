'use client';

import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { useRemoveTransaction } from '@/features/transactions/hooks/mutation/use-remove-transaction';

interface Props extends DialogActions {
  selectedTransactionId: string;
}

const RemoveTransactionDialog = ({ open, onClose, selectedTransactionId }: Props) => {
  const { mutateAsync, isPending } = useRemoveTransaction();

  const onSubmit = async () => {
    await mutateAsync(selectedTransactionId, { onSuccess: onClose });
  };

  return (
    <Dialog
      title="Remove transaction"
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitButtonLoading={isPending}
      confirmButtonText="Yes, remove"
      scrollable>
      <p>Are you sure you want to remove this transaction?</p>
    </Dialog>
  );
};

export default RemoveTransactionDialog;
