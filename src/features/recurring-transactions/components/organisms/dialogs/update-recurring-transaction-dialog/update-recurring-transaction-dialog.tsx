'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateRecurringTransactionSchema } from './schema/update-recurring-transaction-schema';

import { DatePicker } from '@/components/molecules/date-picker';
import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dateFormats } from '@/constants/date-formats';
import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { useUpdateRecurringTransaction } from '@/features/recurring-transactions/hooks/mutation/use-update-recurring-transaction';
import { useCategories } from '@/shared/hooks/query/use-categories';
import { TransactionType } from '@/shared/types/transaction-type';

type FormValues = z.infer<typeof updateRecurringTransactionSchema>;

const defaultValues: FormValues = {
  name: '',
  type: 'income',
  categoryId: '',
  amount: 1,
  date: new Date(),
};

interface Props extends DialogActions {
  selectedTransactionId: string;
  selectedTransactionName: string;
  selectedTransactionAmount: number;
  selectedTransactionType: TransactionType;
  selectedTransactionCategoryId: string;
  selectedTransactionDayOfMonth: number;
}

const UpdateRecurringTransactionDialog = ({
  open,
  onClose,
  selectedTransactionId,
  selectedTransactionName,
  selectedTransactionAmount,
  selectedTransactionType,
  selectedTransactionCategoryId,
  selectedTransactionDayOfMonth,
}: Props) => {
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(updateRecurringTransactionSchema),
  });

  const { data: categoriesData } = useCategories();

  const { mutateAsync, isPending } = useUpdateRecurringTransaction();

  const onSubmit = async (values: FormValues) => {
    await mutateAsync(
      { ...values, id: selectedTransactionId, dayOfMonth: values.date.getDate() },
      { onSuccess: onClose },
    );
  };

  useEffect(() => {
    if (open) {
      form.reset({
        name: selectedTransactionName,
        amount: selectedTransactionAmount,
        type: selectedTransactionType,
        categoryId: selectedTransactionCategoryId,
        date: new Date(2025, 0, selectedTransactionDayOfMonth),
      });
    } else {
      form.reset(defaultValues);
    }
  }, [open]);

  return (
    <Dialog
      title="Update recurring transaction"
      open={open}
      onClose={onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitButtonLoading={isPending}
      scrollable
      isSubmitButtonDisabled={!form.formState.isValid || !form.formState.isDirty}>
      <div className="flex flex-col gap-4">
        <FormProvider {...form}>
          <FormField
            control={form.control}
            name="name"
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
            control={form.control}
            name="categoryId"
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
            control={form.control}
            name="type"
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
            control={form.control}
            name="amount"
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
            control={form.control}
            name="date"
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
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default UpdateRecurringTransactionDialog;
