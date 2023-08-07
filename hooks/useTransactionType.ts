import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TransactionData } from '@/interfaces/operation_interfaces';

const useTransactionType = (type: string): number => {
  const transactions = useSelector(
    (state: RootState) => state.balance.transactions,
  );

  const updatedTransactions: TransactionData[] = transactions.filter(
    (transaction) => transaction.type === type,
  );

  let amount = 0;

  updatedTransactions.forEach((transaction) => {
    amount += transaction.amount;
  });

  return amount;
};

export default useTransactionType;
