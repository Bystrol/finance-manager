import { CategoryCardData } from '@/types/operation_interfaces';
import { Progress } from 'flowbite-react';

const CategoryCard: React.FC<CategoryCardData> = ({
  icon: Icon,
  category,
  amount,
  percentage,
}) => {
  return (
    <div className="flex flex-col w-[47%] lg:w-44 bg-white rounded-xl shadow-md p-4 gap-2">
      <div className="flex justify-center items-center w-10 h-10 rounded-full bg-zinc-300">
        <Icon size={20} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-medium">{category}</h2>
        <p className="text-sm">{amount} PLN</p>
        <Progress
          progress={Math.round(percentage)}
          color="green"
          size="sm"
          labelProgress
          progressLabelPosition="outside"
          labelText
          textLabel="Expenses %"
          textLabelPosition="outside"
        />
      </div>
    </div>
  );
};

export default CategoryCard;
