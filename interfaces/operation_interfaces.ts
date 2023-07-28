import { IconType } from 'react-icons';

export interface FilterProps {
  month: string;
  year: number;
  type: string;
  category: string;
  isFilterModalVisible: boolean;
}

export interface TransactionData {
  month: string;
  year: number;
  date: Date;
  dateText: string;
  type: string;
  category: string;
  description: string;
  amount: number;
  icon: IconType;
}

export interface BalanceData {
  month: string;
  year: number;
  type: string;
  category: string;
  isFilterModalVisible: boolean;
  isIncomeModalVisible: boolean;
  isExpenseModalVisible: boolean;
}

export interface ModalProps {
  onClose: () => void;
}

export interface IsModalEmptyProps {
  description: boolean;
  category: boolean;
  amount: boolean;
}
