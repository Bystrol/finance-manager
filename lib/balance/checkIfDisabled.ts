import { monthsArray, currentMonthName, currentYear } from '@/constants/date';

export const checkIfDisabled = (month: string, year: number): boolean => {
  return (
    monthsArray.indexOf(month) > monthsArray.indexOf(currentMonthName) &&
    year === currentYear
  );
};
