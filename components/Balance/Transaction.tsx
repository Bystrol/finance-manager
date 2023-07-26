import { IconType } from 'react-icons';

interface TransactionProps {
  description: string;
  amount: number;
  type: string;
  date: string;
  icon: IconType;
}

const Transaction: React.FC<TransactionProps> = ({
  description,
  amount,
  type,
  date,
  icon: Icon,
}) => {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg p-3 shadow-md">
      <div className="flex items-center gap-3">
        <Icon size={30} />
        <div className="flex flex-col items-start">
          <p className="text-md">{description}</p>
          <p className="text-xs">{date}</p>
        </div>
      </div>
      <p
        className={`text-lg font-bold ${
          type === 'income' ? 'text-emerald-500' : 'text-red-700'
        }`}
      >
        {type === 'income' ? '+' : '-'}
        {amount} PLN
      </p>
    </div>
  );
};

export default Transaction;
