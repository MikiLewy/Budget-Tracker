'use client';

import { format as dateFormat } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';

interface Props {
  date: Date;
  format: string;
}

export const FormatDate = ({ date, format }: Props) => {
  return <>{dateFormat(date, format, { locale: enUS })}</>;
};

export const formatDate = (date: Date, format: string) => {
  return dateFormat(date, format, {
    locale: enUS,
  });
};
