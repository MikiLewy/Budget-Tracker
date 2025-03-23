import { z } from 'zod';

export const settingsSchema = z.object({
  balance: z.coerce.number().min(0, { message: 'Balance must be greater than 0' }),
  currency: z
    .literal('USD', { message: 'This field is required' })
    .or(z.literal('EUR', { message: 'This field is required' }))
    .or(z.literal('PLN', { message: 'This field is required' })),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
