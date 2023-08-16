import Transaction from '@/components/Balance/Transaction';
import { BalanceData } from '@/interfaces/operation_interfaces';
import useFilteredTransactions from '@/hooks/useFilteredTransactions';

const TransactionsList: React.FC<{ balanceData: BalanceData }> = ({
  balanceData,
}) => {
  const filteredTransactions = useFilteredTransactions(balanceData)

  const sortedTransactions = filteredTransactions.sort(
    (objA, objB) => Number(objB.date) - Number(objA.date),
  );

  return (
    <section className="flex flex-col w-full lg:w-1/3 items-start mt-4 gap-2">
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
              category={transaction.category}
              icon={transaction.icon}
            />
          );
        })}
        {filteredTransactions.length === 0 && (
          <p className="text-sm mt-2">No transactions available.</p>
        )}
      </div>
    </section>
  );
};

export default TransactionsList;
