import { db } from '@/db';
import { Category } from '@/types/responses/category';

export const getCategories = async (): Promise<Category[]> => {
  const data = await db.query.categories.findMany();

  return data;
};
