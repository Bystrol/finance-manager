import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { IsModalEmptyProps } from '@/interfaces/operation_interfaces';
import {
  EditModalProps,
  EditModalData,
} from '@/interfaces/operation_interfaces';
import ModalCart from '@/components/UI/ModalCart';
import { initialIsEmptyData } from '@/constants/transactions';
import { validateModal } from '@/lib/balance/validateModal';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { setLoading } from '@/features/loading/loadingSlice';
import { getTransactions } from '@/lib/balance/getTransactions';
import { updateTransactions } from '@/features/balance/balanceSlice';

const EditModal: React.FC<EditModalProps> = ({
  id,
  type,
  description,
  category,
  amount,
  onClose,
}) => {
  const initialTransactionData = {
    id,
    type,
    description,
    category,
    amount,
    onClose,
  };

  const [transactionData, setTransactionData] = useState<EditModalData>(
    initialTransactionData,
  );

  const [isEmpty, setIsEmpty] = useState<IsModalEmptyProps>(initialIsEmptyData);

  const dispatch = useDispatch();

  const editTransaction = useCallback(async () => {
    if (await validateModal(transactionData, setIsEmpty)) {
      onClose();
      dispatch(setLoading(true));

      try {
        await axios
          .patch('/api/editTransaction', transactionData)
          .then(async () => {
            const transactions = await getTransactions();
            dispatch(updateTransactions(transactions));
          });
      } catch (error) {
        toast.error(Object(error).response.data);
      } finally {
        dispatch(setLoading(false));
      }
    }
  }, [onClose, transactionData, dispatch]);

  return (
    <ModalCart onClick={onClose}>
      <div className="flex flex-wrap w-4/5 justify-between items-center">
        <label htmlFor="description" className="font-bold">
          Description
        </label>
        <input
          id="description"
          type="text"
          defaultValue={description}
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
          onChange={(e) => {
            setTransactionData({
              ...transactionData,
              description: e.target.value,
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
          defaultValue={category}
          onChange={(e) => {
            setTransactionData({
              ...transactionData,
              category: e.target.value,
            });
          }}
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-1"
        >
          <option disabled>- select -</option>
          {type === 'Incomes' ? (
            <>
              <option>Salary</option>
              <option>Transfer</option>
            </>
          ) : (
            <>
              <option>Food</option>
              <option>Clothes</option>
              <option>Transportation</option>
            </>
          )}
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
          defaultValue={amount}
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
        onClick={editTransaction}
      >
        Edit transaction
      </button>
    </ModalCart>
  );
};

export default EditModal;
