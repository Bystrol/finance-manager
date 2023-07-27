'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TransactionData } from '@/interfaces/operation_interfaces';
import ModalCart from '@/components/UI/ModalCart';
import { currentDay, currentMonthName, currentYear } from '@/constants/date';
import { MdWorkOutline } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
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
  icon: BsQuestionSquare,
};

const IncomeModal: React.FC<IncomeModalProps> = ({ onClose }) => {
  const [transactionData, setTransactionData] = useState<TransactionData>(
    initialTransactionData,
  );

  const dispatch = useDispatch();

  const setCategory = (category: string) => {
    let icon;

    switch (category) {
      case 'Salary':
        icon = MdWorkOutline;
        break;
      case 'Transfer':
        icon = BiTransfer;
        break;
      default:
        icon = BsQuestionSquare;
    }

    setTransactionData({
      ...transactionData,
      category,
      icon: icon,
    });
  };

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
          <option>Salary</option>
          <option>Transfer</option>
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
