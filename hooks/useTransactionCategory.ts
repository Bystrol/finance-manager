import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TransactionData } from '@/interfaces/operation_interfaces';

const useTransactionCategory = (category: string): number => {
  const transactions = useSelector(
    (state: RootState) => state.balance.transactions,
  );

  const updatedTransactions: TransactionData[] = transactions.filter(
    (transaction) => transaction.category === category,
  );

  let amount = 0;

  updatedTransactions.forEach((transaction) => {
    amount += transaction.amount;
  });

  return amount;
};

export default useTransactionCategory;
