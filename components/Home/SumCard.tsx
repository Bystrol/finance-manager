import { SumCardProps } from '@/types/types';

const SumCard = (props: SumCardProps) => {
  return (
    <div className="flex justify-center items-center gap-6 w-1/2 lg:w-48 bg-white rounded-xl shadow-md py-4">
      <div className={`border-4 ${props.borderColor} p-2 rounded-full`}>
        <props.icon size={20} />
      </div>
      <div>
        <h2 className="text-md font-medium">{props.text}</h2>
        <p className="text-sm">{props.amount} PLN</p>
      </div>
    </div>
  );
};

export default SumCard;
