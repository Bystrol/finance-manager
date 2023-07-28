import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  TransactionData,
  ModalProps,
  IsModalEmptyProps,
} from '@/interfaces/operation_interfaces';
import ModalCart from '@/components/UI/ModalCart';
import {
  currentDay,
  currentMonthName,
  currentYear,
  currentDate,
} from '@/constants/date';
import { MdWorkOutline } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { BsQuestionSquare } from 'react-icons/bs';
import { addIncome } from '@/features/balance/balanceSlice';

const initialTransactionData = {
  description: '',
  category: '',
  amount: 0,
  type: 'Incomes',
  date: currentDate,
  dateText: String(currentMonthName + ' ' + currentDay + ', ' + currentYear),
  icon: BsQuestionSquare,
  month: currentMonthName,
  year: currentYear,
};

const initialIsEmptyData = {
  description: false,
  category: false,
  amount: false,
};

const IncomeModal: React.FC<ModalProps> = ({ onClose }) => {
  const [transactionData, setTransactionData] = useState<TransactionData>(
    initialTransactionData,
  );

  const [isEmpty, setIsEmpty] = useState<IsModalEmptyProps>(initialIsEmptyData);

  const dispatch = useDispatch();

  const setCategory = (category: string): void => {
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

  const validateModal = useCallback(async (): Promise<boolean> => {
    let isModalValid: boolean = true;

    await setIsEmpty((prevIsEmpty) => {
      const updatedIsEmpty: IsModalEmptyProps = {
        description: prevIsEmpty.description,
        category: prevIsEmpty.category,
        amount: prevIsEmpty.amount,
      };

      if (transactionData.description === '') {
        updatedIsEmpty.description = true;
        isModalValid = false;
      } else {
        updatedIsEmpty.description = false;
      }

      if (transactionData.category === '') {
        updatedIsEmpty.category = true;
        isModalValid = false;
      } else {
        updatedIsEmpty.category = false;
      }

      if (transactionData.amount === 0) {
        updatedIsEmpty.amount = true;
        isModalValid = false;
      } else {
        updatedIsEmpty.amount = false;
      }

      return {
        description: updatedIsEmpty.description,
        category: updatedIsEmpty.category,
        amount: updatedIsEmpty.amount,
      };
    });

    return isModalValid;
  }, [
    transactionData.description,
    transactionData.category,
    transactionData.amount,
  ]);

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
          onChange={async (e) => {
            setTransactionData({
              ...transactionData,
              description: e.target.value,
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
          <option>Salary</option>
          <option>Transfer</option>
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
          if (await validateModal()) {
            dispatch(addIncome(transactionData));
            onClose();
          }
        }}
      >
        Add income
      </button>
    </ModalCart>
  );
};

export default IncomeModal;
