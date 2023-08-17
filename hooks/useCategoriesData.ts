import { CategoryCartData } from '@/interfaces/operation_interfaces';
import { FaBusAlt } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';
import { BsQuestionSquare } from 'react-icons/bs';
import useFilteredAmount from './useFilteredAmount';

const useCategoriesData = () => {
  const foodTotalAmount = useFilteredAmount('category', 'Food');
  const transportTotalAmount = useFilteredAmount('category', 'Transport');
  const clothesTotalAmount = useFilteredAmount('category', 'Clothes');
  const othersTotalAmount = useFilteredAmount('category', 'Others');

  const expensesTotalAmount =
    foodTotalAmount + transportTotalAmount + clothesTotalAmount + othersTotalAmount;

  const calculatePercentage = (amount: number) => {
    return (amount/expensesTotalAmount) * 100
  }

  const categories: CategoryCartData[] = [
    {
      icon: IoFastFoodOutline,
      category: 'Food',
      amount: foodTotalAmount,
      percentage: calculatePercentage(foodTotalAmount) | 0
    },
    {
      icon: FaBusAlt,
      category: 'Transport',
      amount: transportTotalAmount,
      percentage: calculatePercentage(transportTotalAmount) | 0
    },
    {
      icon: GiClothes,
      category: 'Clothes',
      amount: clothesTotalAmount,
      percentage: calculatePercentage(clothesTotalAmount) | 0
    },
    {
      icon: BsQuestionSquare,
      category: 'Others',
      amount: othersTotalAmount,
      percentage: calculatePercentage(othersTotalAmount) | 0
    },
  ];

  return categories;
};

export default useCategoriesData;
