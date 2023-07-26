'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TransactionData } from '@/interfaces/operation_interfaces';
import ModalCart from '@/components/UI/ModalCart';
import { currentDay, currentMonthName, currentYear } from '@/constants/date';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';
import { FaBus } from 'react-icons/fa';
import { BsQuestionSquare } from 'react-icons/bs';
import { addIncome } from '@/features/balance/balanceSlice';

interface IncomeModalProps {
  onClose: () => void;
}

const initialTransactionData = {
  description: '',
  category: '',
  amount: 0,
  type: 'income',
  date: String(currentMonthName + ' ' + currentDay + ', ' + currentYear),
  icon: undefined,
};

const IncomeModal: React.FC<IncomeModalProps> = ({ onClose }) => {
  const [transactionData, setTransactionData] = useState<TransactionData>(
    initialTransactionData,
  );

  const dispatch = useDispatch();

  const setCategory = (category: string) => {
    let icon;

    switch (category) {
      case 'Food':
        icon = IoFastFoodOutline;
        break;
      case 'Clothes':
        icon = GiClothes;
        break;
      case 'Travelling':
        icon = FaBus;
        break;
      default:
        icon = BsQuestionSquare;
    }

    setTransactionData({
      ...transactionData,
      category,
      icon: icon.name,
    });
  };

  useEffect(() => {
    console.log(transactionData);
  }, [transactionData]);

  return (
    <ModalCart onClick={onClose}>
      <div className="flex w-4/5 justify-between items-center">
        <label htmlFor="description" className="font-bold">
          Description
        </label>
        <input
          id="description"
          type="text"
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
          onChange={(e) => {
            setTransactionData({
              ...transactionData,
              description: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex w-4/5 justify-between items-center">
        <label htmlFor="category" className="font-bold">
          Category
        </label>
        <select
          name="category"
          id="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
          defaultValue="- select -"
        >
          <option disabled>- select -</option>
          <option>Food</option>
          <option>Clothes</option>
          <option>Travelling</option>
        </select>
      </div>
      <div className="flex w-4/5 justify-between items-center">
        <label htmlFor="amount" className="font-bold">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
          onChange={(e) => {
            setTransactionData({
              ...transactionData,
              amount: Number(parseFloat(e.target.value).toFixed(2)),
            });
          }}
        />
      </div>
      <button
        className="w-1/2 h-10 bg-black text-white font-bold rounded-md hover:bg-zinc-700 mt-4"
        onClick={() => {
          dispatch(addIncome(transactionData));
          onClose();
        }}
      >
        Add income
      </button>
    </ModalCart>
  );
};

export default IncomeModal;
