import { CategoryCartData } from '@/interfaces/operation_interfaces';
import { FaBusAlt } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';
import { BsQuestionSquare } from 'react-icons/bs';
import useTransactionCategory from '@/hooks/useTransactionCategory';

const useCategoriesData = () => {
  const foodTotalAmount = useTransactionCategory('Food');
  const transportTotalAmount = useTransactionCategory('Transport');
  const clothesTotalAmount = useTransactionCategory('Clothes');
  const othersTotalAmount = useTransactionCategory('Others');

  const expensesTotalAmount =
    foodTotalAmount + transportTotalAmount + clothesTotalAmount;
  const foodPercentage = (foodTotalAmount / expensesTotalAmount) * 100;
  const transportPercentage =
    (transportTotalAmount / expensesTotalAmount) * 100;
  const clothesPercentage = (clothesTotalAmount / expensesTotalAmount) * 100;
  const othersPercentage = (othersTotalAmount / expensesTotalAmount) * 100;

  const categories: CategoryCartData[] = [
    {
      icon: IoFastFoodOutline,
      category: 'Food',
      amount: foodTotalAmount,
      percentage: foodPercentage,
    },
    {
      icon: FaBusAlt,
      category: 'Transport',
      amount: transportTotalAmount,
      percentage: transportPercentage,
    },
    {
      icon: GiClothes,
      category: 'Clothes',
      amount: clothesTotalAmount,
      percentage: clothesPercentage,
    },
    {
      icon: BsQuestionSquare,
      category: 'Others',
      amount: othersTotalAmount,
      percentage: othersPercentage,
    },
  ];

  return categories;
};

export default useCategoriesData;
