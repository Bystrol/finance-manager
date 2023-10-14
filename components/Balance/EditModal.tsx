import { useState } from 'react';
import { IsModalEmptyProps } from '@/types/operation_interfaces';
import { EditModalProps, EditModalData } from '@/types/operation_interfaces';
import ModalCard from '@/components/UI/ModalCard';
import { initialIsEmptyData } from '@/constants/transactions';
import { validateModal } from '@/lib/balance/validateModal';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { setLoading } from '@/features/loading/loadingSlice';
import { editTransaction } from '@/features/balance/balanceSlice';
import { useDispatch } from 'react-redux';

const EditModal: React.FC<EditModalProps> = ({
  id,
  type,
  description,
  category,
  amount,
  icon,
  closeModal,
}) => {
  const initialTransactionData = {
    id,
    type,
    description,
    category,
    amount,
    icon,
  };

  const [transactionData, setTransactionData] = useState<EditModalData>(
    initialTransactionData,
  );

  const [isEmpty, setIsEmpty] = useState<IsModalEmptyProps>(initialIsEmptyData);

  const dispatch = useDispatch();

  const editTransactionHandler = async () => {
    if (await validateModal(transactionData, setIsEmpty)) {
      closeModal();
      dispatch(setLoading(true));

      try {
        await axios.patch('/api/editTransaction', transactionData).then(() => {
          dispatch(editTransaction(transactionData));
        });
      } catch (error) {
        toast.error(Object(error).response.data);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <ModalCard onClick={closeModal}>
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
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
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
              <option>Transport</option>
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
        onClick={editTransactionHandler}
      >
        Edit transaction
      </button>
    </ModalCard>
  );
};

export default EditModal;
