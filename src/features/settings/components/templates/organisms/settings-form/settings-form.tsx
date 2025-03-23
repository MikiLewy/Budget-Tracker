'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { LoadingButton } from '@/components/atoms/loading-button';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { currencies } from '@/constants/currencies';
import { useFormatPrice } from '@/hooks/use-format-price';
import { useUpdateUserDetails } from '@/shared/hooks/mutation/use-update-user-details';
import { useCurrentUser } from '@/shared/hooks/query/use-current-user';

import { SettingsFormValues, settingsSchema } from './schema/settings-schema';

const defaultValues: SettingsFormValues = {
  balance: 0,
  currency: 'EUR',
};

const SettingsForm = () => {
  const { formatPrice } = useFormatPrice();

  const form = useForm<SettingsFormValues>({
    defaultValues,
    resolver: zodResolver(settingsSchema),
    mode: 'onBlur',
  });

  const { data: user } = useCurrentUser();

  const { mutate: updateUserDetails, isPending: isUpdatingUserDetails } = useUpdateUserDetails();

  const onSubmit = (values: SettingsFormValues) => {
    updateUserDetails({
      balance: values.balance,
      currency: values.currency,
    });
  };

  useEffect(() => {
    if (user) {
      form.reset({ balance: user?.balance, currency: user?.currency });
    }
  }, [user]);

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-4">
        <div className="max-w-sm flex flex-col gap-4">
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <Input type="number" min={1} {...field} />
                    <div>{formatPrice(user?.balance || 0)}</div>
                  </div>
                </FormControl>
                <FormMessage />
                <FormDescription>Set your budget</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select
                  onValueChange={value => {
                    field.onChange(value);
                    form.trigger('currency');
                  }}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.value} {currency.sign}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription>This will be your default currency for all transactions.</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Separator className="mt-5" />
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="outline"
            disabled={!form.formState.isDirty}
            onClick={() => form.reset({ balance: user?.balance })}>
            Reset
          </Button>
          <LoadingButton
            loading={isUpdatingUserDetails}
            disabled={!form.formState.isDirty || !form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}>
            Save changes
          </LoadingButton>
        </div>
      </div>
    </FormProvider>
  );
};

export default SettingsForm;
