import Transaction from '@/components/Balance/Transaction';
import { BalanceData } from '@/types/operation_interfaces';
import { Dispatch, SetStateAction } from 'react';
import useFilteredTransactions from '@/hooks/useFilteredTransactions';

type TransactionsListProps = {
  balanceData: BalanceData;
  setBalanceData: Dispatch<SetStateAction<BalanceData>>;
  initialBalanceData: BalanceData;
};

const TransactionsList = (props: TransactionsListProps) => {
  const filteredTransactions = useFilteredTransactions(props.balanceData);

  const sortedTransactions = filteredTransactions.sort(
    (objA, objB) => Number(objB.date) - Number(objA.date),
  );

  return (
    <section className="flex flex-col w-full lg:w-1/3 items-start mt-4 gap-2">
      <h2 className="font-medium">
        Transaction history from {props.balanceData.month}{' '}
        {props.balanceData.year}
      </h2>
      <div className="flex justify-between w-full gap-2">
        <div className="flex">
          <h2 className="font-medium mr-1">Active filters:</h2>
          <p>Type - {props.balanceData.type}</p>
          {props.balanceData.type !== 'All' && (
            <p>, Category - {props.balanceData.category}</p>
          )}
        </div>
        <button
          onClick={() => props.setBalanceData(props.initialBalanceData)}
          className="bg-black rounded-xl text-white text-sm font-bold px-2 py-1"
        >
          Reset filters
        </button>
      </div>
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
