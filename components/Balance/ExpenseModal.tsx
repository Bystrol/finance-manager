import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
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
import { validateModal } from '@/lib/balance/validateModal';
import { getTransactions } from '@/lib/balance/getTransactions';
import { updateTransactions } from '@/features/balance/balanceSlice';
import { setLoading } from '@/features/loading/loadingSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ExpenseModal: React.FC<TransactionModalProps> = ({ onClose }) => {
  const [transactionData, setTransactionData] = useState<TransactionData>(
    initialTransactionData,
  );

  const [isEmpty, setIsEmpty] = useState<IsModalEmptyProps>(initialIsEmptyData);

  const dispatch = useDispatch();

  const postTransaction = useCallback(async () => {
    if (await validateModal(transactionData, setIsEmpty)) {
      onClose();
      dispatch(setLoading(true));

      try {
        await axios
          .post('/api/postTransaction', transactionData)
          .then(async () => {
            const updatedResponse = await getTransactions();
            dispatch(updateTransactions(updatedResponse));
          });
      } catch (error) {
        toast.error(Object(error).response.data);
      } finally {
        dispatch(setLoading(false));
      }
    }
  }, [dispatch, onClose, transactionData]);

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
        onClick={postTransaction}
      >
        Add expense
      </button>
    </ModalCart>
  );
};

export default ExpenseModal;
