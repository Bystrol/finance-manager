export const currentDate: Date = new Date();
export const currentDay = currentDate.getDate();
export const currentMonthNumber: number = currentDate.getMonth();
export const monthsArray: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const currentMonthName: string = monthsArray[currentMonthNumber];
export const currentYear: number = currentDate.getFullYear();
export const yearsArray: number[] = [];

for (let i = currentYear; i >= currentYear - 10; i--) {
  yearsArray.push(i);
}
