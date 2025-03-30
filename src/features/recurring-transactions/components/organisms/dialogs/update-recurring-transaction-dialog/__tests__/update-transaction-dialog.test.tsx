import { fireEvent, render, screen, userEvent, waitFor } from '@/__tests__/__utils__/render-with-providers';
import { TransactionType } from '@/shared/types/transaction-type';
import { CategoryType } from '@/types/enum/category-type';

import UpdateRecurringTransactionDialog from '../update-recurring-transaction-dialog';

vi.mock('@/shared/hooks/query/use-categories', () => ({
  useCategories: () => ({
    data: [
      { id: 'test', name: 'Category 1', type: CategoryType.EDUCATION },
      { id: 'test-2', name: 'Category2', type: CategoryType.FOOD },
    ],
    isLoading: false,
    isFetching: false,
    error: '',
  }),
}));

describe('UpdateRecurringTransactionDialog', () => {
  const props = {
    open: true,
    onClose: vi.fn(),
    selectedTransactionId: '123',
    selectedTransactionName: 'Test',
    selectedTransactionAmount: 100,
    selectedTransactionType: 'income' as TransactionType,
    selectedTransactionCategoryId: 'test',
    selectedTransactionDate: new Date(),
    selectedTransactionDayOfMonth: 10,
  };

  afterEach(() => {
    props.open = true;
    props.selectedTransactionId = '123';
    props.selectedTransactionName = 'Test';
    props.selectedTransactionAmount = 100;
    props.selectedTransactionType = 'income';
    props.selectedTransactionCategoryId = 'test';
    props.selectedTransactionDate = new Date();
    props.selectedTransactionDayOfMonth = 10;
  });

  it('Should not render dialog when open is false', () => {
    props.open = false;

    render(<UpdateRecurringTransactionDialog {...props} />);

    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('Should call onClose when cancel button is clicked', () => {
    render(<UpdateRecurringTransactionDialog {...props} />);

    const cancelButton = screen.getByRole('button', {
      name: 'Cancel',
    });

    fireEvent.click(cancelButton);

    expect(props.onClose).toHaveBeenCalled();
  });

  it('Should initially disable confirm button', () => {
    render(<UpdateRecurringTransactionDialog {...props} />);

    const confirmButton = screen.getByRole('button', {
      name: 'Confirm',
    });

    expect(confirmButton).toBeDisabled();
  });

  it('Should display error message when name is invalid', async () => {
    render(<UpdateRecurringTransactionDialog {...props} />);

    const nameInput = screen.getByRole('textbox', {
      name: 'Name',
    });

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.blur(nameInput);

    const errorMessage = await screen.findByText('This field is required');

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should display error message when amount is invalid', async () => {
    render(<UpdateRecurringTransactionDialog {...props} />);

    const amountInput = screen.getByRole('spinbutton', {
      name: 'Amount',
    });

    fireEvent.change(amountInput, { target: { value: '' } });
    fireEvent.blur(amountInput);

    const errorMessage = await screen.findByText('This field should be positive number');

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should display language options when language input is clicked ', async () => {
    render(<UpdateRecurringTransactionDialog {...props} />);

    const categorySelect = screen.getByRole('combobox', {
      name: 'Category',
    });

    fireEvent.click(categorySelect);

    const option = await screen.findByText('Category2');

    fireEvent.click(option);

    expect(categorySelect).toHaveTextContent('Category2');
  });

  it('Should enable confirm button when form is valid', async () => {
    render(<UpdateRecurringTransactionDialog {...props} />);

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

    const option = await screen.findByText('Category2');

    await userEvent.click(option);

    fireEvent.change(amountInput, { target: { value: 100 } });

    fireEvent.blur(amountInput);

    const confirmButton = screen.getByRole('button', {
      name: 'Confirm',
    });

    await waitFor(() => expect(confirmButton).toBeEnabled());
  });
});
