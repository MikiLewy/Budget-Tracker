import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/shared/api/lib/categories';
import { categoriesKeys } from '@/shared/api/query-keys/categories';
import { Category } from '@/types/responses/category';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: categoriesKeys.list(),
    queryFn: getCategories,
  });
};
