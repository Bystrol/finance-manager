'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface BalanceProps {
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
const currentYear: number = currentDate.getFullYear();
const yearsArray: number[] = [];

for (let i = currentYear; i >= currentYear - 10; i--) {
  yearsArray.push(i);
}

const checkIfDisabled = (month: string): boolean => {
  return monthsArray.indexOf(month) > monthsArray.indexOf(currentMonthName);
};

const Balance = () => {
  const { data: session } = useSession();
  const [date, setDate] = useState<BalanceProps>({
    month: currentMonthName,
    year: currentYear,
  });

  return (
    <div className="flex flex-col items-center w-full gap-2 text-center">
      <h1 className="text-xl font-medium">
        {session?.user?.name}&apos;s balance in {date?.month} {date?.year}
      </h1>
      <hr className="w-full" />
      <h2 className="text-4xl font-bold">1000zł</h2>
      <select
        name="month"
        id="month"
        defaultValue={currentMonthName}
        onChange={(e) => {
          setDate({
            ...date,
            month: e.target.value,
          });
        }}
      >
        {monthsArray.map((month) => {
          return (
            <option
              key={month}
              disabled={checkIfDisabled(month)}
              className={checkIfDisabled(month) ? 'bg-slate-600/10' : ''}
            >
              {month}
            </option>
          );
        })}
      </select>
      <select
        name="year"
        id="year"
        defaultValue={currentYear}
        onChange={(e) => {
          setDate({
            ...date,
            year: parseInt(e.target.value),
          });
        }}
      >
        {yearsArray.map((year) => {
          return <option key={year}>{year}</option>;
        })}
      </select>
    </div>
  );
};

export default Balance;
