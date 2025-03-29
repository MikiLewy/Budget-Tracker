import { fireEvent, render, screen, userEvent, waitFor } from '@/__tests__/__utils__/render-with-providers';
import { CategoryType } from '@/types/enum/category-type';

import OnboardingDialog from '../onboarding-dialog';

vi.mock('@/shared/hooks/query/use-categories', () => ({
  useCategories: () => ({
    data: [{ id: 'test', name: 'Category 1', type: CategoryType.EDUCATION }],
    isLoading: false,
    isFetching: false,
    error: '',
  }),
}));

describe('OnboardingDialog', () => {
  const props = {
    open: true,
    onClose: vi.fn(),
  };

  afterEach(() => {
    props.open = true;
  });

  it('Should not render dialog when open is false', () => {
    props.open = false;

    render(<OnboardingDialog {...props} />);

    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('Should initially render first step', async () => {
    render(<OnboardingDialog {...props} />);

    const firstStepTitle = await screen.findByText('Welcome to the budget tracker!');

    expect(firstStepTitle).toBeInTheDocument();
  });

  it('Should disable next button when balance is empty', () => {
    render(<OnboardingDialog {...props} />);

    const balanceInput = screen.getByRole('spinbutton', {
      name: 'Balance',
    });

    fireEvent.change(balanceInput, { target: { value: '' } });

    const nextStepButton = screen.getByRole('button', {
      name: 'Next step',
    });

    expect(nextStepButton).toBeDisabled();
  });

  it('Should render second step when next step button is clicked', async () => {
    render(<OnboardingDialog {...props} />);

    const nextStepButton = screen.getByRole('button', {
      name: 'Next step',
    });

    fireEvent.click(nextStepButton);

    const secondStepTitle = await screen.findByText('Set up your recurring transactions (optional)');

    expect(secondStepTitle).toBeInTheDocument();
  });

  it('Should render first step when previous step button is clicked on second step', async () => {
    render(<OnboardingDialog {...props} />);

    const nextStepButton = screen.getByRole('button', {
      name: 'Next step',
    });

    fireEvent.click(nextStepButton);

    const previousStepButton = screen.getByRole('button', {
      name: 'Previous step',
    });

    fireEvent.click(previousStepButton);

    const firstStepTitle = await screen.findByText('Welcome to the budget tracker!');

    expect(firstStepTitle).toBeInTheDocument();
  });

  it('Should render first step when previous step button is clicked on second step', async () => {
    render(<OnboardingDialog {...props} />);

    const nextStepButton = screen.getByRole('button', {
      name: 'Next step',
    });

    fireEvent.click(nextStepButton);

    const previousStepButton = screen.getByRole('button', {
      name: 'Previous step',
    });

    fireEvent.click(previousStepButton);

    const firstStepTitle = await screen.findByText('Welcome to the budget tracker!');

    expect(firstStepTitle).toBeInTheDocument();
  });

  it('Should initially disable confirm button on second step', async () => {
    render(<OnboardingDialog {...props} />);

    const nextStepButton = screen.getByRole('button', {
      name: 'Next step',
    });

    fireEvent.click(nextStepButton);

    const confirmButton = screen.getByRole('button', {
      name: 'Submit',
    });

    expect(confirmButton).toBeDisabled();
  });

  it('Should display currency options when currency input is clicked ', async () => {
    render(<OnboardingDialog {...props} />);

    const currencySelect = screen.getByRole('combobox', {
      name: 'Currency',
    });

    fireEvent.click(currencySelect);

    const option = await screen.findByText('USD $');

    fireEvent.click(option);

    expect(currencySelect).toHaveTextContent('USD $');
  });

  it('Should display error message when name is invalid', async () => {
    render(<OnboardingDialog {...props} />);

    const nextStepButton = screen.getByRole('button', {
      name: 'Next step',
    });

    fireEvent.click(nextStepButton);

    const nameInput = screen.getByRole('textbox', {
      name: 'Name',
    });

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.blur(nameInput);

    const errorMessage = await screen.findByText('This field is required');

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should display error message when amount is invalid', async () => {
    render(<OnboardingDialog {...props} />);

    const nextStepButton = screen.getByRole('button', {
      name: 'Next step',
    });

    fireEvent.click(nextStepButton);

    const amountInput = screen.getByRole('spinbutton', {
      name: 'Amount',
    });

    fireEvent.change(amountInput, { target: { value: '' } });
    fireEvent.blur(amountInput);

    const errorMessage = await screen.findByText('This field should be positive number');

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should enable confirm button when form is valid', async () => {
    render(<OnboardingDialog {...props} />);

    const nextStepButton = screen.getByRole('button', {
      name: 'Next step',
    });

    fireEvent.click(nextStepButton);

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
      name: 'Submit',
    });

    await waitFor(() => expect(confirmButton).toBeEnabled());
  });
});
