import axios from 'axios';
import { setCategory } from '@/lib/balance/setCategory';
import { TransactionData } from '@/interfaces/operation_interfaces';
import { toast } from 'react-hot-toast';

export const getTransactions = async () => {
  let updatedResponse: TransactionData[] = [];

  try {
    const response = await axios.get('/api/getTransactions');
    updatedResponse = [...response.data];

    updatedResponse.forEach((transaction) => {
      transaction.date = new Date(transaction.date);
      transaction.icon = setCategory(transaction.category);
    });
  } catch (error) {
    toast.error(toast.error(Object(error).response.data));
  }

  return updatedResponse;
};
