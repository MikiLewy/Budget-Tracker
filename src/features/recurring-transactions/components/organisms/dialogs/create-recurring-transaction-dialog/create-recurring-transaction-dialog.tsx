'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { DatePicker } from '@/components/molecules/date-picker';
import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dateFormats } from '@/constants/date-formats';
import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { useCreateRecurringTransaction } from '@/features/recurring-transactions/hooks/mutation/use-create-recurring-transaction';
import { useCategories } from '@/shared/hooks/query/use-categories';

import { createRecurringTransactionSchema } from './schema/create-recurring-transaction-schema';

type FormValues = z.infer<typeof createRecurringTransactionSchema>;

const defaultValues: FormValues = {
  name: '',
  type: 'income',
  categoryId: '',
  amount: 1,
  date: new Date(2025, 0, 1),
};

const CreateRecurringTransactionDialog = ({ open, onClose }: DialogActions) => {
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(createRecurringTransactionSchema),
  });

  const { data: categoriesData } = useCategories();

  const { mutateAsync, isPending } = useCreateRecurringTransaction();

  const onSubmit = async (values: FormValues) => {
    await mutateAsync(
      { ...values, dayOfMonth: values.date.getDate() },
      {
        onSuccess: () => {
          onClose?.();
          toast.success('Successfully created recurring transaction');
        },
      },
    );
  };

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open]);

  return (
    <Dialog
      title="Create recurring transaction"
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

export default CreateRecurringTransactionDialog;
