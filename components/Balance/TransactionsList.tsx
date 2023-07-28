import Transaction from '@/components/Balance/Transaction';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { BalanceData } from '@/interfaces/operation_interfaces';

const TransactionsList: React.FC<{ balanceData: BalanceData }> = ({
  balanceData,
}) => {
  const transactions = useSelector(
    (state: RootState) => state.balance.transactions,
  );

  const filteredTransactions = () => {
    let filteredTransactions;

    if (balanceData.type === 'All') {
      return (filteredTransactions = transactions.filter(
        (transaction) =>
          transaction.month === balanceData.month &&
          transaction.year === balanceData.year,
      ));
    } else if (balanceData.category === 'All') {
      return (filteredTransactions = transactions.filter(
        (transaction) =>
          transaction.month === balanceData.month &&
          transaction.year === balanceData.year &&
          transaction.type === balanceData.type,
      ));
    } else {
      return (filteredTransactions = transactions.filter(
        (transaction) =>
          transaction.month === balanceData.month &&
          transaction.year === balanceData.year &&
          transaction.type === balanceData.type &&
          transaction.category === balanceData.category,
      ));
    }
  };

  const sortedTransactions = filteredTransactions().sort(
    (objA, objB) => Number(objB.date) - Number(objA.date),
  );

  return (
    <section className="flex flex-col w-full items-start mt-4 gap-2">
      <h2 className="font-medium">Transaction History</h2>
      <hr className="w-full h-[2px] bg-zinc-100" />
      <div className="flex flex-col w-full gap-4">
        {sortedTransactions.map((transaction) => {
          return (
            <Transaction
              key={transaction.id}
              id={transaction.id}
              description={transaction.description}
              amount={transaction.amount}
              type={transaction.type}
              dateText={transaction.dateText}
              icon={transaction.icon}
            />
          );
        })}
        {filteredTransactions().length === 0 && (
          <p className="text-sm mt-2">No transactions available.</p>
        )}
      </div>
    </section>
  );
};

export default TransactionsList;
