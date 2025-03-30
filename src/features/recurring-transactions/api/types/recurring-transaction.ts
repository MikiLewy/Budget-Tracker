import { InferDBResultType } from '@/types/infer-db-result-type';

export type RecurringTransaction = InferDBResultType<
  'recurringTransactions',
  {
    category: {
      columns: {
        id: true;
        name: true;
        type: true;
      };
    };
  }
>;
