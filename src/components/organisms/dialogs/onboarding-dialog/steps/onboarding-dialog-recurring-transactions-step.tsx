import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { LoadingButton } from '@/components/atoms/loading-button';
import { DatePicker } from '@/components/molecules/date-picker';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { DialogDescription } from '@/components/ui/dialog';
import { DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { FormDescription, FormMessage } from '@/components/ui/form';
import { FormControl } from '@/components/ui/form';
import { FormLabel } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
import { dateFormats } from '@/constants/date-formats';
import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { useCreateRecurringTransaction } from '@/features/recurring-transactions/hooks/mutation/use-create-recurring-transaction';
import { useUpdateUserDetails } from '@/shared/hooks/mutation/use-update-user-details';
import { useCategories } from '@/shared/hooks/query/use-categories';

import { OnboardingFormValues } from '../schema/onboarding-schema';

interface Props {
  onClose?: () => void;
}

const OnboardingDialogRecurringTransactionsStep = ({ onClose }: Props) => {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useFormContext<OnboardingFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recurringTransactions',
  });

  const { data: categoriesData } = useCategories();

  const balance = watch('balance');
  const currency = watch('currency');

  const { mutateAsync: updateUserDetails, isPending: isPendingUpdateUserDetails } = useUpdateUserDetails();

  const { mutateAsync: createRecurringTransactions } = useCreateRecurringTransaction();

  const onSkip = async () => {
    await updateUserDetails({
      balance,
      currency,
      completedOnboarding: true,
    });

    onClose?.();
  };

  const onSubmit = async (values: OnboardingFormValues) => {
    await updateUserDetails({
      balance: values.balance,
      currency: values.currency,
      completedOnboarding: true,
    });

    const recurringTransactionsPromises = values.recurringTransactions.map(transaction =>
      createRecurringTransactions({
        ...transaction,
        dayOfMonth: transaction.date.getDate(),
      }),
    );

    await Promise.allSettled(recurringTransactionsPromises).then(results => {
      const statuses = results.map(result => result.status);
      const hasRejected = statuses.includes('rejected');
      const hasFulfilled = statuses.includes('fulfilled');

      if (hasRejected && !hasFulfilled) {
        toast.error('Failed to create recurring transactions');
      }
      if (hasRejected && hasFulfilled) {
        toast.error('Failed to create some recurring transactions');
      }
      if (!hasRejected && hasFulfilled) {
        toast.success('Recurring transactions created successfully');
      }
    });

    onClose?.();
  };

  return (
    <>
      <DialogHeader className="flex flex-col gap-2 p-1">
        <DialogTitle>Set up your recurring transactions (optional)</DialogTitle>
        <DialogDescription>
          Easily automate your finances by setting up recurring transactions for subscriptions, bills, or savings. You
          can configure them now or skip this step and add them later in recurring transactions view.
        </DialogDescription>
      </DialogHeader>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-lg font-medium">Recurring transaction {index + 1}</h2>
            {fields.length > 1 ? (
              <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                <Trash2 />
              </Button>
            ) : null}
          </div>
          <div className="flex flex-col gap-3 mb-2">
            <FormField
              control={control}
              name={`recurringTransactions.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoFocus={false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`recurringTransactions.${index}.categoryId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoriesData?.map(category => {
                        const Icon = transactionsCategoriesTypes[category.type]?.icon;

                        return (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              {category.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`recurringTransactions.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="income" value="income">
                        Income
                      </SelectItem>
                      <SelectItem key="expense" value="expense">
                        Expense
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`recurringTransactions.${index}.amount`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} autoFocus={false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`recurringTransactions.${index}.date`}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Day of the month</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      disableNavigation
                      dateFormat={`${dateFormats.day}`}
                      defaultMonth={new Date(2025, 0)}
                      components={{
                        CaptionLabel: () => <div className="text-center text-sm font-medium">Select a day</div>,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>Transaction will occur on this day each month</FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
      <Button
        variant="link"
        className="w-fit hover:no-underline"
        onClick={() => append({ amount: 0, categoryId: '', date: new Date(), name: '', type: 'income' })}>
        <Plus /> Add new transaction
      </Button>

      <DialogFooter className="mt-4 gap-2 p-1">
        <Button variant="ghost" onClick={() => setValue('step', 1)}>
          Previous step
        </Button>
        <Button variant="ghost" onClick={onSkip} disabled={isPendingUpdateUserDetails}>
          Skip for now
        </Button>
        <LoadingButton disabled={!isValid} onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
          Submit
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default OnboardingDialogRecurringTransactionsStep;
