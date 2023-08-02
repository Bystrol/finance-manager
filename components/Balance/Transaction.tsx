import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import EditModal from '@/components/Balance/EditModal';
import { getTransactions } from '@/lib/balance/getTransactions';
import { updateTransactions } from '@/features/balance/balanceSlice';
import { setLoading } from '@/features/loading/loadingSlice';
import { IconType } from 'react-icons';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface TransactionProps {
  id: string;
  description: string;
  amount: number;
  type: string;
  dateText: string;
  category: string;
  icon: IconType;
}

const Transaction: React.FC<TransactionProps> = ({
  id,
  description,
  amount,
  type,
  dateText,
  category,
  icon: Icon,
}) => {
  const [showOptionsCart, setShowOptionsCart] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const toggleOptionsCart = () => {
    setShowOptionsCart((prevState) => !prevState);
  };

  const closeOptionsCart = () => {
    setShowOptionsCart(false);
  };

  const toggleModal = () => {
    setShowEditModal((prevState) => !prevState);
  };

  const deleteTransaction = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      await axios.patch('/api/deleteTransaction', { id }).then(async () => {
        const updatedResponse = await getTransactions();
        dispatch(updateTransactions(updatedResponse));
      });
    } catch (error) {
      toast.error(Object(error).response.data);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, id]);

  return (
    <>
      <div
        tabIndex={1}
        className="relative flex justify-between items-center bg-white rounded-lg p-3 shadow-md cursor-pointer"
        onClick={toggleOptionsCart}
        onBlur={closeOptionsCart}
      >
        <div className="flex items-center gap-3">
          <Icon size={30} />
          <div className="flex flex-col items-start">
            <p className="text-md">{description}</p>
            <p className="text-xs">{dateText}</p>
          </div>
        </div>
        <p
          className={`text-lg font-bold ${
            type === 'Incomes' ? 'text-emerald-500' : 'text-red-700'
          }`}
        >
          {type === 'Incomes' ? '+' : '-'}
          {amount} PLN
        </p>
        {showOptionsCart && (
          <div className="flex justify-center items-center gap-4 absolute top-0 left-0 w-full h-full bg-white rounded-lg text-sm font-bold">
            <div
              className="flex justify-center items-center gap-1 hover:scale-110 transition-all"
              onClick={toggleModal}
            >
              <FiEdit />
              <p className="cursor-pointer">EDIT</p>
            </div>
            <div
              className="flex justify-center items-center gap-1 hover:scale-110 transition-all"
              onClick={deleteTransaction}
            >
              <RiDeleteBin6Line />
              <p className="cursor-pointer">DELETE</p>
            </div>
          </div>
        )}
      </div>
      {showEditModal && (
        <EditModal
          id={id}
          type={type}
          description={description}
          category={category}
          amount={amount}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default Transaction;
