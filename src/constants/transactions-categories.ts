import {
  Bus,
  CircleEllipsis,
  Drama,
  GraduationCap,
  HeartPulse,
  Home,
  LucideIcon,
  Pizza,
  PlaneTakeoff,
  Store,
} from 'lucide-react';

import { CategoryType } from '@/types/enum/category-type';

export const transactionsCategoriesTypes: {
  [key in CategoryType]: { icon: LucideIcon; label: string; value: CategoryType };
} = {
  [CategoryType.HOME]: {
    icon: Home,
    label: 'Home',
    value: CategoryType.HOME,
  },
  [CategoryType.TRANSPORT]: {
    icon: Bus,
    label: 'Transport',
    value: CategoryType.TRANSPORT,
  },
  [CategoryType.FOOD]: {
    icon: Pizza,
    label: 'Food',
    value: CategoryType.FOOD,
  },
  [CategoryType.HEALTH]: {
    icon: HeartPulse,
    label: 'Health',
    value: CategoryType.HEALTH,
  },
  [CategoryType.EDUCATION]: {
    icon: GraduationCap,
    label: 'Education',
    value: CategoryType.EDUCATION,
  },
  [CategoryType.ENTERTAINMENT]: {
    icon: Drama,
    label: 'Entertainment',
    value: CategoryType.ENTERTAINMENT,
  },
  [CategoryType.SHOPPING]: {
    icon: Store,
    label: 'Shopping',
    value: CategoryType.SHOPPING,
  },
  [CategoryType.TRAVEL]: {
    icon: PlaneTakeoff,
    label: 'Travel',
    value: CategoryType.TRAVEL,
  },
  [CategoryType.OTHER]: {
    icon: CircleEllipsis,
    label: 'Other',
    value: CategoryType.OTHER,
  },
};
