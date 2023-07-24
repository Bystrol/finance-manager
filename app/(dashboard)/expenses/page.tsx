'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface ExpensesProps {
  month: string;
  year: number;
}

const currentDate: Date = new Date();
const currentMonthNumber: number = currentDate.getMonth();
const monthsArray: string[] = [
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
const currentMonthName: string = monthsArray[currentMonthNumber];
const currentYear = currentDate.getFullYear();

const Expenses = () => {
  const { data: session } = useSession();
  const [date, setDate] = useState<ExpensesProps>({
    month: currentMonthName,
    year: currentYear,
  });

  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-xl font-medium">
        {session?.user?.name}&apos;s finances balance in {date?.month}{' '}
        {date?.year}
      </h1>
      <hr />
    </div>
  );
};

export default Expenses;
