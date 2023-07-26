import Transaction from '@/components/Balance/Transaction';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const TransactionsList: React.FC = () => {
  const transactions = useSelector(
    (state: RootState) => state.balance.transactions,
  );

  return (
    <section className="flex flex-col w-full items-start mt-4 gap-2">
      <h2 className="font-medium">Transaction History</h2>
      <hr className="w-full h-[2px] bg-zinc-100" />
      <div className="flex flex-col w-full gap-4">
        {transactions.map((transaction) => {
          return (
            <Transaction
              key={transaction.description}
              description={transaction.description}
              amount={transaction.amount}
              type={transaction.type}
              date={transaction.date}
              icon={transaction.icon}
            />
          );
        })}
        {transactions.length === 0 && (
          <p className="text-sm mt-2">No transactions available.</p>
        )}
      </div>
    </section>
  );
};

export default TransactionsList;
