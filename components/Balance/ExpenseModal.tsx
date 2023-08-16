import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  TransactionData,
  TransactionModalProps,
  IsModalEmptyProps,
} from '@/interfaces/operation_interfaces';
import ModalCard from '@/components/UI/ModalCard';
import {
  initialTransactionData,
  initialIsEmptyData,
} from '@/constants/transactions';
import { validateModal } from '@/lib/balance/validateModal';
import { getCategoryIcon } from '@/lib/balance/getCategoryIcon';
import { addExpense } from '@/features/balance/balanceSlice';
import { setLoading } from '@/features/loading/loadingSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ExpenseModal: React.FC<TransactionModalProps> = ({ onClose }) => {
  const [transactionData, setTransactionData] = useState<TransactionData>(
    initialTransactionData,
  );

  const [isEmpty, setIsEmpty] = useState<IsModalEmptyProps>(initialIsEmptyData);

  const dispatch = useDispatch();

  const postTransaction = async () => {
    if (await validateModal(transactionData, setIsEmpty)) {
      onClose();
      dispatch(setLoading(true));

      try {
        await axios
          .post('/api/postTransaction', transactionData)
          .then((res) => {
            const response = res.data;
            response.date = new Date(response.date);
            response.icon = getCategoryIcon(response.category);
            dispatch(addExpense(response));
          });
      } catch (error) {
        toast.error(Object(error).response.data);
      } finally {
        dispatch(setLoading(false));
      }
    }
  }

  return (
    <ModalCard onClick={onClose}>
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
            setTransactionData({
              ...transactionData,
              category: e.target.value,
            });
          }}
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
          defaultValue="- select -"
        >
          <option disabled>- select -</option>
          <option>Food</option>
          <option>Clothes</option>
          <option>Transport</option>
          <option>Others</option>
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
        onClick={postTransaction}
      >
        Add expense
      </button>
    </ModalCard>
  );
};

export default ExpenseModal;
