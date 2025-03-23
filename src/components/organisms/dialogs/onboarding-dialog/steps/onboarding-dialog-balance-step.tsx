import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { DialogDescription } from '@/components/ui/dialog';
import { DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { FormDescription, FormMessage } from '@/components/ui/form';
import { FormControl } from '@/components/ui/form';
import { FormLabel } from '@/components/ui/form';
import { FormItem } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { currencies } from '@/constants/currencies';

import { OnboardingFormValues } from '../schema/onboarding-schema';

const OnboardingDialogBalanceStep = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  const balance = watch('balance');

  const nextDisabled = (balance !== 0 && !balance) || !!errors.balance || !!errors.currency;

  return (
    <>
      <DialogHeader className="flex flex-col gap-2 p-1">
        <DialogTitle>Welcome to the budget tracker!</DialogTitle>
        <DialogDescription>
          Please enter your initial balance to get started. This will help us set up your account and get you on track
          to managing your finances.
        </DialogDescription>
      </DialogHeader>
      <FormField
        control={control}
        name="balance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Balance</FormLabel>
            <FormControl>
              <Input type="number" min={0} autoFocus={false} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="currency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Currency</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            <FormDescription>
              This will be your default currency for all transactions. You can change it later in the settings.
            </FormDescription>
          </FormItem>
        )}
      />
      <DialogFooter className="mt-4 gap-2 p-1">
        <Button disabled={nextDisabled} onClick={() => setValue('step', 2)}>
          Next step
        </Button>
      </DialogFooter>
    </>
  );
};

export default OnboardingDialogBalanceStep;
