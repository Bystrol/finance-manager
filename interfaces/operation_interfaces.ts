import { IconType } from 'react-icons';

export interface FilterProps {
  month: string;
  year: number;
  type: string;
  category: string;
  isFilterModalVisible: boolean;
}

export interface TransactionData {
  id: string;
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

export interface TransactionModalProps {
  onClose: () => void;
}

export interface EditModalProps {
  id: string;
  type: string;
  icon: IconType;
  description: string;
  category: string;
  amount: number;
  onClose: () => void;
}

export interface EditModalData {
  id: string;
  description: string;
  category: string;
  amount: number;
  icon: IconType;
}

export interface IsModalEmptyProps {
  description: boolean;
  category: boolean;
  amount: boolean;
}
