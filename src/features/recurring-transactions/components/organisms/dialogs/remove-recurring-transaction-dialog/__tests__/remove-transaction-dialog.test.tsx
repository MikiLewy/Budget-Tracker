import { fireEvent, render, screen, waitFor } from '@/__tests__/__utils__/render-with-providers';

import RemoveRecurringTransactionDialog from '../remove-recurring-transaction-dialog';

describe('RemoveRecurringTransactionDialog', () => {
  const props = {
    open: true,
    onClose: vi.fn(),
    selectedTransactionId: '123',
  };

  afterEach(() => {
    props.open = true;
  });

  it('Should not render dialog when open is false', () => {
    props.open = false;

    render(<RemoveRecurringTransactionDialog {...props} />);

    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('Should call onClose when cancel button is clicked', () => {
    render(<RemoveRecurringTransactionDialog {...props} />);

    const cancelButton = screen.getByRole('button', {
      name: 'Cancel',
    });

    fireEvent.click(cancelButton);

    expect(props.onClose).toHaveBeenCalled();
  });

  it('Should disable confirm button when transaction id is not valid', () => {
    render(<RemoveRecurringTransactionDialog {...props} selectedTransactionId="" />);

    const confirmButton = screen.getByRole('button', {
      name: 'Yes, remove',
    });

    expect(confirmButton).toBeDisabled();
  });

  it('Should initially enable confirm button', async () => {
    render(<RemoveRecurringTransactionDialog {...props} />);

    const confirmButton = screen.getByRole('button', {
      name: 'Yes, remove',
    });

    await waitFor(() => expect(confirmButton).toBeEnabled());
  });
});
