import { InferDBResultType } from '@/types/infer-db-result-type';

export type Transaction = InferDBResultType<
  'transactions',
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
