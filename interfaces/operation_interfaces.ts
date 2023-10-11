import { IconType } from 'react-icons';

export interface FilterProps {
  month: string;
  year: number;
  type: string;
  category: string;
  isFilterModalVisible: boolean;
}

export interface BalanceData extends FilterProps {
  isIncomeModalVisible: boolean;
  isExpenseModalVisible: boolean;
}

export interface TransactionModalProps {
  onClose: () => void;
}

export interface EditModalData {
  id: string;
  type: string;
  description: string;
  category: string;
  amount: number;
  icon: IconType;
}

export interface EditModalProps extends EditModalData {
  closeModal: () => void;
}

export interface TransactionData extends EditModalData {
  [key: string]: string | number | Date | IconType;
  month: string;
  year: number;
  date: Date;
  dateText: string;
}

export interface IsModalEmptyProps {
  description: boolean;
  category: boolean;
  amount: boolean;
}

export interface CategoryCardData {
  icon: IconType;
  category: string;
  amount: number;
  percentage: number;
}
