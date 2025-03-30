import { z } from 'zod';

export const onboardingSchema = z.object({
  step: z.number(),
  balance: z.coerce.number({ invalid_type_error: 'This field is required' }),
  currency: z
    .literal('USD', { message: 'This field is required' })
    .or(z.literal('EUR', { message: 'This field is required' }))
    .or(z.literal('PLN', { message: 'This field is required' })),
  recurringTransactions: z.array(
    z.object({
      name: z.string().min(1, { message: 'This field is required' }),
      amount: z.coerce
        .number({ invalid_type_error: 'This field is required' })
        .positive({ message: 'This field should be positive number' })
        .min(1, { message: 'This field is required' }),
      type: z
        .literal('income', { message: 'This field is required' })
        .or(z.literal('expense', { message: 'This field is required' })),
      categoryId: z.string().min(1, { message: 'This field is required' }),
      date: z.date({ message: 'This field is required' }),
    }),
  ),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
