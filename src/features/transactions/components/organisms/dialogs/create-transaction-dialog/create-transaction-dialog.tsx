'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { DatePicker } from '@/components/molecules/date-picker';
import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { transactionsCategoriesTypes } from '@/constants/transactions-categories';
import { useCreateTransaction } from '@/features/transactions/hooks/mutation/use-create-transaction';
import { useCategories } from '@/shared/hooks/query/use-categories';
import { useCurrentUser } from '@/shared/hooks/query/use-current-user';
import { calculateBalanceBasedOnTransactionType } from '@/shared/utils/calculate-balance-based-on-transaction-type';

import { createTransactionSchema } from './schema/create-transaction-schema';

type FormValues = z.infer<typeof createTransactionSchema>;

const defaultValues: FormValues = {
  name: '',
  type: 'income',
  categoryId: '',
  amount: 1,
  date: new Date(),
};

const CreateTransactionDialog = ({ open, onClose }: DialogActions) => {
  const form = useForm<FormValues>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(createTransactionSchema),
  });

  const { data: categoriesData } = useCategories();

  const { data: currentUser } = useCurrentUser();

  const { mutateAsync, isPending } = useCreateTransaction();

  const onSubmit = async (values: FormValues) => {
    await mutateAsync({ ...values, userId: currentUser?.clerkId || '' }, { onSuccess: onClose });
  };

  const transactionType = form.watch('type');

  const amount = form.watch('amount');

  const balanceAfterTransaction = calculateBalanceBasedOnTransactionType({
    transactionType,
    amount: Number(amount),
    balance: currentUser?.balance || 0,
  });

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open]);

  return (
    <Dialog
      title="Create transaction"
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
                <FormDescription>Balance in your account after transaction: {balanceAfterTransaction}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
                <FormDescription>This is the date of the transaction</FormDescription>
              </FormItem>
            )}
          />
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default CreateTransactionDialog;
