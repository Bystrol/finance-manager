import { IconType } from 'react-icons';

export interface FilterProps {
  month: string;
  year: number;
}

export interface TransactionData {
  description: string;
  category: string;
  amount: number;
  type: string;
  date: string;
  icon: IconType | undefined | string;
}
