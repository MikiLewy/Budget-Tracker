import { db } from '@/db';

export const getTransactions = async () => {
  const response = await db.query.transactions.findMany({
    with: {
      category: {
        columns: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
  });

  return response;
};

export const createTransaction = async () => {
  //  await db.insert(transactions).values();
};
