'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/features/loading/loadingSlice';
import { updateTransactions } from '@/features/balance/balanceSlice';
import { getTransactions } from '@/lib/balance/getTransactions';
import { toast } from 'react-hot-toast';
import { HiArrowUpRight, HiArrowDownRight } from 'react-icons/hi2';
import useFilteredAmount from '@/hooks/useFilteredAmount';
import CategoryCard from '@/components/Home/CategoryCard';
import useCategoriesData from '@/hooks/useCategoriesData';
import { currentMonthName, currentYear } from '@/constants/date';
import { SumCardProps } from '@/types/types';
import SumCard from '@/components/Home/SumCard';

const Home = () => {
  const dispatch = useDispatch();

  const incomeAmount = useFilteredAmount(
    'Incomes',
    currentMonthName,
    currentYear,
  );
  const expensesAmount = useFilteredAmount(
    'Expenses',
    currentMonthName,
    currentYear,
  );

  const categoriesArray = useCategoriesData();

  const sumCards: SumCardProps[] = [
    {
      borderColor: 'border-lime-300',
      icon: HiArrowUpRight,
      text: 'Income',
      amount: incomeAmount,
    },
    {
      borderColor: 'border-red-500',
      icon: HiArrowDownRight,
      text: 'Expenses',
      amount: expensesAmount,
    },
  ];

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading(true));
      try {
        const updatedResponse = await getTransactions();
        dispatch(updateTransactions(updatedResponse));
      } catch (error) {
        toast.error(Object(error).response.data);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getData();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full gap-10">
      <h1 className="text-xl font-medium">
        Your finances in {currentMonthName} {currentYear}
      </h1>
      <div className="flex flex-wrap lg:flex-nowrap self-start justify-center w-full gap-4">
        <section className="flex gap-4 w-full lg:w-auto mt-4 lg:mt-0 lg:flex-col">
          {sumCards.map((card) => {
            return (
              <SumCard
                key={card.text}
                borderColor={card.borderColor}
                icon={card.icon}
                text={card.text}
                amount={card.amount}
              />
            );
          })}
        </section>
        <hr className="w-full h-[2px] bg-zinc-100 lg:hidden" />
        <section className="flex flex-wrap justify-between gap-4 w-full lg:w-auto">
          {categoriesArray.map((category) => {
            return (
              <CategoryCard
                key={category.category}
                icon={category.icon}
                category={category.category}
                amount={category.amount}
                percentage={category.percentage}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Home;
