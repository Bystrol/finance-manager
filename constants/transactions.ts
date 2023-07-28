import { currentDate, currentMonthName, currentDay, currentYear } from './date';
import { BsQuestionSquare } from 'react-icons/bs';

export const initialTransactionData = {
  id: '',
  description: '',
  category: '',
  amount: 0,
  type: '',
  date: currentDate,
  dateText: String(currentMonthName + ' ' + currentDay + ', ' + currentYear),
  icon: BsQuestionSquare,
  month: currentMonthName,
  year: currentYear,
};

export const initialIsEmptyData = {
  description: false,
  category: false,
  amount: false,
};
