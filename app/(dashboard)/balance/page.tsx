'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import OperationButton from '@/components/Balance/OperationButton';
import FilterModal from '@/components/Balance/FilterModal';

import { FilterProps } from '@/interfaces/operation_interfaces';

import { currentMonthName, currentYear } from '@/constants/date';

import { FiFilter } from 'react-icons/fi';
import { HiArrowUpRight, HiArrowDownRight } from 'react-icons/hi2';
import { IconType } from 'react-icons';
import IncomeModal from '@/components/Balance/IncomeModal';
import TransactionsList from '@/components/Balance/TransactionsList';

interface Operation {
  icon: IconType;
  text: string;
  onClick: () => void;
}

interface BalanceData {
  isFilterModalVisible: boolean;
  isIncomeModalVisible: boolean;
  isExpenseModalVisible: boolean;
}

const initialBalanceData = {
  isFilterModalVisible: false,
  isIncomeModalVisible: false,
  isExpenseModalVisible: false,
};

const Balance: React.FC = () => {
  const { data: session } = useSession();
  const [date, setDate] = useState<FilterProps>({
    month: currentMonthName,
    year: currentYear,
  });
  const [balanceData, setBalanceData] =
    useState<BalanceData>(initialBalanceData);

  const operationsArray: Operation[] = [
    {
      icon: FiFilter,
      text: 'Filter',
      onClick: () => {
        setBalanceData({
          ...balanceData,
          isFilterModalVisible: true,
        });
      },
    },
    {
      icon: HiArrowUpRight,
      text: 'Income',
      onClick: () => {
        setBalanceData({
          ...balanceData,
          isIncomeModalVisible: true,
        });
      },
    },
    {
      icon: HiArrowDownRight,
      text: 'Expense',
      onClick: () => {},
    },
  ];

  return (
    <div className="flex flex-col items-center w-full gap-2 text-center">
      <h1 className="text-xl font-medium">
        {session?.user?.name}&apos;s balance in {date?.month} {date?.year}
      </h1>
      <hr className="w-full" />
      <h2 className="text-4xl font-bold my-4">1000 PLN</h2>
      <div className="flex justify-center gap-4">
        {operationsArray.map((operation) => {
          return (
            <OperationButton
              key={operation.text}
              icon={operation.icon}
              text={operation.text}
              onClick={operation.onClick}
            />
          );
        })}
      </div>
      <TransactionsList />
      {balanceData.isFilterModalVisible && (
        <FilterModal
          date={date}
          setDate={setDate}
          onClick={() => {
            setBalanceData({
              ...balanceData,
              isFilterModalVisible: false,
            });
          }}
        />
      )}
      {balanceData.isIncomeModalVisible && (
        <IncomeModal
          onClose={() => {
            setBalanceData({
              ...balanceData,
              isIncomeModalVisible: false,
            });
          }}
        />
      )}
    </div>
  );
};

export default Balance;
