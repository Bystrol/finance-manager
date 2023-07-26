import Transaction from '@/components/Balance/Transaction';
import { TransactionData } from '@/interfaces/operation_interfaces';
import { currentDay, currentMonthName, currentYear } from '@/constants/date';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';
import { FaBus } from 'react-icons/fa';

const transactionsList = [
  {
    description: 'description',
    category: 'category',
    amount: 100,
    type: 'income',
    date: String(currentMonthName + ' ' + currentDay + ', ' + currentYear),
    icon: IoFastFoodOutline,
  },
  {
    description: 'description2',
    category: 'category2',
    amount: 200,
    type: 'income',
    date: String(currentMonthName + ' ' + currentDay + ', ' + currentYear),
    icon: GiClothes,
  },
  {
    description: 'description3',
    category: 'category3',
    amount: 300,
    type: 'expense',
    date: String(currentMonthName + ' ' + currentDay + ', ' + currentYear),
    icon: FaBus,
  },
];

const TransactionsList: React.FC = () => {
  return (
    <section className="flex flex-col w-full items-start mt-4 gap-2">
      <h2 className="font-medium">Transaction History</h2>
      <div className="flex flex-col w-full gap-4">
        {transactionsList.map((transaction) => {
          return (
            <Transaction
              key={transaction.description}
              description={transaction.description}
              category={transaction.category}
              amount={transaction.amount}
              type={transaction.type}
              date={transaction.date}
              icon={transaction.icon}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TransactionsList;
