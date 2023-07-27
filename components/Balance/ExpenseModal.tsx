import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TransactionData } from '@/interfaces/operation_interfaces';
import ModalCart from '@/components/UI/ModalCart';
import {
  currentDay,
  currentMonthName,
  currentYear,
  currentDate,
} from '@/constants/date';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';
import { FaBusAlt } from 'react-icons/fa';
import { BsQuestionSquare } from 'react-icons/bs';
import { addExpense } from '@/features/balance/balanceSlice';

interface ExpenseModalProps {
  onClose: () => void;
}

const initialTransactionData = {
  description: '',
  category: '',
  amount: 0,
  type: 'Expenses',
  date: currentDate,
  dateText: String(currentMonthName + ' ' + currentDay + ', ' + currentYear),
  icon: BsQuestionSquare,
  month: currentMonthName,
  year: currentYear,
};

const ExpenseModal: React.FC<ExpenseModalProps> = ({ onClose }) => {
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
      case 'Transportation':
        icon = FaBusAlt;
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
              date: new Date(),
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
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-1"
          defaultValue="- select -"
        >
          <option disabled>- select -</option>
          <option>Food</option>
          <option>Clothes</option>
          <option>Transportation</option>
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
          dispatch(addExpense(transactionData));
          onClose();
        }}
      >
        Add expense
      </button>
    </ModalCart>
  );
};

export default ExpenseModal;
