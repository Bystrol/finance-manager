import { CategoryCartData } from '@/interfaces/operation_interfaces';
import { FaBusAlt } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';
import { BsQuestionSquare } from 'react-icons/bs';
import useFilteredAmount from './useFilteredAmount';
import { currentMonthName, currentYear } from '@/constants/date';

const useCategoriesData = () => {
  const foodTotalAmount = useFilteredAmount('Expenses', currentMonthName, currentYear, 'Food');
  const transportTotalAmount = useFilteredAmount('Expenses', currentMonthName, currentYear, 'Transport');
  const clothesTotalAmount = useFilteredAmount('Expenses', currentMonthName, currentYear, 'Clothes');
  const othersTotalAmount = useFilteredAmount('Expenses', currentMonthName, currentYear, 'Others');

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
