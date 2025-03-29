import { fireEvent, render, screen, userEvent, waitFor } from '@/__tests__/__utils__/render-with-providers';
import { CategoryType } from '@/types/enum/category-type';

import CreateRecurringTransactionDialog from '../create-recurring-transaction-dialog';

vi.mock('@/shared/hooks/query/use-categories', () => ({
  useCategories: () => ({
    data: [{ id: 'test', name: 'Category 1', type: CategoryType.EDUCATION }],
    isLoading: false,
    isFetching: false,
    error: '',
  }),
}));

describe('CreateRecurringTransactionDialog', () => {
  const props = {
    open: true,
    onClose: vi.fn(),
  };

  afterEach(() => {
    props.open = true;
  });

  it('Should not render dialog when open is false', () => {
    props.open = false;

    render(<CreateRecurringTransactionDialog {...props} />);

    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('Should call onClose when cancel button is clicked', () => {
    render(<CreateRecurringTransactionDialog {...props} />);

    const cancelButton = screen.getByRole('button', {
      name: 'Cancel',
    });

    fireEvent.click(cancelButton);

    expect(props.onClose).toHaveBeenCalled();
  });

  it('Should initially disable confirm button', () => {
    render(<CreateRecurringTransactionDialog {...props} />);

    const confirmButton = screen.getByRole('button', {
      name: 'Confirm',
    });

    expect(confirmButton).toBeDisabled();
  });

  it('Should display error message when name is invalid', async () => {
    render(<CreateRecurringTransactionDialog {...props} />);

    const nameInput = screen.getByRole('textbox', {
      name: 'Name',
    });

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.blur(nameInput);

    const errorMessage = await screen.findByText('This field is required');

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should display error message when amount is invalid', async () => {
    render(<CreateRecurringTransactionDialog {...props} />);

    const amountInput = screen.getByRole('spinbutton', {
      name: 'Amount',
    });

    fireEvent.change(amountInput, { target: { value: '' } });
    fireEvent.blur(amountInput);

    const errorMessage = await screen.findByText('This field should be positive number');

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should display language options when language input is clicked ', async () => {
    render(<CreateRecurringTransactionDialog {...props} />);

    const categorySelect = screen.getByRole('combobox', {
      name: 'Category',
    });

    fireEvent.click(categorySelect);

    const option = await screen.findByText('Category 1');

    fireEvent.click(option);

    expect(categorySelect).toHaveTextContent('Category 1');
  });

  it('Should enable confirm button when form is valid', async () => {
    render(<CreateRecurringTransactionDialog {...props} />);

    const nameInput = screen.getByRole('textbox', {
      name: 'Name',
    });

    fireEvent.change(nameInput, { target: { value: 'Test' } });

    fireEvent.blur(nameInput);

    const amountInput = screen.getByRole('spinbutton', {
      name: 'Amount',
    });

    const categorySelect = screen.getByRole('combobox', {
      name: 'Category',
    });

    await userEvent.click(categorySelect);

    const option = await screen.findByText('Category 1');

    await userEvent.click(option);

    fireEvent.change(amountInput, { target: { value: 100 } });

    fireEvent.blur(amountInput);

    const confirmButton = screen.getByRole('button', {
      name: 'Confirm',
    });

    await waitFor(() => expect(confirmButton).toBeEnabled());
  });
});
