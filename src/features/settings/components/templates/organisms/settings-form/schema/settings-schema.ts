import { z } from 'zod';

export const useSettingsSchema = () => {
  return z.object({
    balance: z.coerce.number().min(0, { message: 'Balance must be greater than 0' }),
  });
};
