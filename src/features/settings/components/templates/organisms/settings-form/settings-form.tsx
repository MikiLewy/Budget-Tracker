'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSettingsSchema } from './schema/settings-schema';

import { LoadingButton } from '@/components/atoms/loading-button';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUpdateUserDetails } from '@/shared/hooks/mutation/use-update-user-details';
import { useCurrentUser } from '@/shared/hooks/query/use-current-user';
import { formatPrice } from '@/utils/format-price';

const defaultValues = {
  balance: 0,
};

const SettingsForm = () => {
  const validationSchema = useSettingsSchema();

  const form = useForm<z.infer<typeof validationSchema>>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
  });

  const { data: user } = useCurrentUser();

  const { mutate: updateUserDetails, isPending: isUpdatingUserDetails } = useUpdateUserDetails();

  const onSubmit = (values: z.infer<typeof validationSchema>) => {
    updateUserDetails(values.balance);
  };

  useEffect(() => {
    if (user) {
      form.reset({ balance: user?.balance });
    }
  }, [user]);

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-4">
        <div className="max-w-sm">
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
