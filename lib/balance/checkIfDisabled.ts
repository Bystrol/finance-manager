import { monthsArray, currentMonthName } from '@/constants/date';

export const checkIfDisabled = (month: string): boolean => {
  return monthsArray.indexOf(month) > monthsArray.indexOf(currentMonthName);
};
