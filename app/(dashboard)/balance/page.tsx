'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BalanceData } from '@/types/operation_interfaces';
import { RootState } from '@/store/store';
import OperationButton from '@/components/Balance/OperationButton';
import FilterModal from '@/components/Balance/FilterModal';
import IncomeModal from '@/components/Balance/IncomeModal';
import ExpenseModal from '@/components/Balance/ExpenseModal';
import TransactionsList from '@/components/Balance/TransactionsList';
import { currentMonthName, currentYear } from '@/constants/date';
import { updateTransactions } from '@/features/balance/balanceSlice';
import { setLoading } from '@/features/loading/loadingSlice';
import { getTransactions } from '@/lib/balance/getTransactions';
import { toast } from 'react-hot-toast';
import { FiFilter } from 'react-icons/fi';
import { HiArrowUpRight, HiArrowDownRight } from 'react-icons/hi2';
import { IconType } from 'react-icons';

const initialBalanceData = {
  month: currentMonthName,
  year: currentYear,
  type: 'All',
  category: 'All',
  isFilterModalVisible: false,
  isIncomeModalVisible: false,
  isExpenseModalVisible: false,
};

const Balance = () => {
  const { data: session } = useSession();

  const [balanceData, setBalanceData] =
    useState<BalanceData>(initialBalanceData);

  const totalAmount = useSelector((state: RootState) =>
    state.balance.totalAmount.toFixed(2),
  );

  const dispatch = useDispatch();

  const operationButtons: { icon: IconType; text: string; type: string }[] = [
    {
      icon: FiFilter,
      text: 'Filter',
      type: 'isFilterModalVisible',
    },
    {
      icon: HiArrowUpRight,
      text: 'Income',
      type: 'isIncomeModalVisible',
    },
    {
      icon: HiArrowDownRight,
      text: 'Expense',
      type: 'isExpenseModalVisible',
    },
  ];

  const modals = [
    {
      type: 'isFilterModalVisible',
      component: FilterModal,
    },
    {
      type: 'isIncomeModalVisible',
      component: IncomeModal,
    },
    {
      type: 'isExpenseModalVisible',
      component: ExpenseModal,
    },
  ];

  const handleModal = (modalType: string, isVisible: boolean) => {
    setBalanceData({
      ...balanceData,
      [modalType]: isVisible,
    });
  };

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading(true));
      try {
        const updatedResponse = await getTransactions();
        dispatch(updateTransactions(updatedResponse));
      } catch (error) {
        toast.error(Object(error).response.data);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getData();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full gap-2 text-center">
      <h1 className="text-xl font-medium">
        {session?.user?.name}&apos;s balance
      </h1>
      <hr className="w-full" />
      <h2 className="text-4xl font-bold my-4">{totalAmount} PLN</h2>
      <div className="flex justify-center gap-4">
        {operationButtons.map((operation, index) => {
          return (
            <OperationButton
              key={index}
              icon={operation.icon}
              text={operation.text}
              onClick={() => handleModal(operation.type, true)}
            />
          );
        })}
      </div>
      <TransactionsList
        balanceData={balanceData}
        setBalanceData={setBalanceData}
        initialBalanceData={initialBalanceData}
      />
      {modals.map((modal, index) => {
        const { type, component: ModalComponent } = modal;
        const isOpen = balanceData[type];
        return (
          isOpen && (
            <ModalComponent
              key={index}
              balanceData={balanceData}
              setBalanceData={setBalanceData}
              onClose={() => handleModal(type, false)}
            />
          )
        );
      })}
    </div>
  );
};

export default Balance;
