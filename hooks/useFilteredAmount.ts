import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TransactionData } from '@/interfaces/operation_interfaces';

const useFilteredAmount = (type: string, month: string, year: number, category?: string): number => {
  const transactions = useSelector(
    (state: RootState) => state.balance.transactions,
  );

  let updatedTransactions: TransactionData[]

  if(category) {
    updatedTransactions = transactions.filter(
      (transaction) => transaction.type === type && transaction.month === month && transaction.year === year && transaction.category === category
    );
  } else {
    updatedTransactions = transactions.filter(
      (transaction) => transaction.type === type && transaction.month === month && transaction.year === year
    );
  }

  let amount = 0;

  updatedTransactions.forEach((transaction) => {
    amount += transaction.amount;
  });

  return amount;
};

export default useFilteredAmount;
