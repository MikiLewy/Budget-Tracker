import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { DialogActions } from '../../dialog';

import { OnboardingFormValues, onboardingSchema } from './schema/onboarding-schema';
import OnboardingDialogBalanceStep from './steps/onboarding-dialog-balance-step';
import OnboardingDialogRecurringTransactionsStep from './steps/onboarding-dialog-recurring-transactions-step';

const defaultValues: OnboardingFormValues = {
  step: 1,
  balance: 0,
  currency: 'PLN',
  recurringTransactions: [
    {
      amount: 0,
      categoryId: '',
      date: new Date(2025, 0, 10),
      name: '',
      type: 'income',
    },
  ],
};

const OnboardingDialog = ({ open, onClose }: DialogActions) => {
  const form = useForm<OnboardingFormValues>({
    defaultValues,
    resolver: zodResolver(onboardingSchema),
    mode: 'onBlur',
  });

  const step = form.watch('step');

  const renderStep = () => {
    switch (step) {
      case 1:
        return <OnboardingDialogBalanceStep />;
      case 2:
        return <OnboardingDialogRecurringTransactionsStep onClose={onClose} />;
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open, form]);

  return (
    <Dialog open={open} defaultOpen={open} modal>
      <DialogContent hideCloseButton className={cn('overflow-y-auto max-h-[550px] sm:max-h-[700px]', 'lg:max-w-2xl ')}>
        <FormProvider {...form}>{renderStep()}</FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingDialog;
