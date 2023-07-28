import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  TransactionData,
  TransactionModalProps,
  IsModalEmptyProps,
} from '@/interfaces/operation_interfaces';
import ModalCart from '@/components/UI/ModalCart';
import {
  initialTransactionData,
  initialIsEmptyData,
} from '@/constants/transactions';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';
import { FaBusAlt } from 'react-icons/fa';
import { BsQuestionSquare } from 'react-icons/bs';
import { addExpense } from '@/features/balance/balanceSlice';
import { validateModal } from '@/lib/balance/validateModal';

const ExpenseModal: React.FC<TransactionModalProps> = ({ onClose }) => {
  const [transactionData, setTransactionData] = useState<TransactionData>(
    initialTransactionData,
  );

  const [isEmpty, setIsEmpty] = useState<IsModalEmptyProps>(initialIsEmptyData);

  const dispatch = useDispatch();

  const setCategory = useCallback(
    (category: string) => {
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
    },
    [transactionData],
  );

  return (
    <ModalCart onClick={onClose}>
      <div className="flex flex-wrap w-4/5 justify-between items-center">
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
              id: uuidv4(),
              description: e.target.value,
              type: 'Expenses',
              date: new Date(),
            });
          }}
        />
        {isEmpty.description && (
          <p className="w-full text-right text-xs text-red-700">
            This field is required
          </p>
        )}
      </div>
      <div className="flex flex-wrap w-4/5 justify-between items-center">
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
        {isEmpty.category && (
          <p className="w-full text-right text-xs text-red-700">
            This field is required
          </p>
        )}
      </div>
      <div className="flex flex-wrap w-4/5 justify-between items-center">
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
        {isEmpty.amount && (
          <p className="w-full text-right text-xs text-red-700">
            This field is required
          </p>
        )}
      </div>
      <button
        className="w-1/2 h-10 bg-black text-white font-bold rounded-md hover:bg-zinc-700 mt-4"
        onClick={async () => {
          if (await validateModal(transactionData, setIsEmpty)) {
            dispatch(addExpense(transactionData));
            onClose();
          }
        }}
      >
        Add expense
      </button>
    </ModalCart>
  );
};

export default ExpenseModal;
