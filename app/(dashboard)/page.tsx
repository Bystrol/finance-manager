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

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const incomeAmount = useFilteredAmount(
    'Incomes',
    currentMonthName,
    currentYear,
  );
  const expenseAmount = useFilteredAmount(
    'Expenses',
    currentMonthName,
    currentYear,
  );

  const categoriesArray = useCategoriesData();

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
          <div className="flex justify-center items-center gap-6 w-1/2 lg:w-48 bg-white rounded-xl shadow-md py-4">
            <div className="border-4 border-lime-300 p-2 rounded-full">
              <HiArrowUpRight size={20} />
            </div>
            <div>
              <h2 className="text-md font-medium">Income</h2>
              <p className="text-sm">{incomeAmount} PLN</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-6 w-1/2 lg:w-48 bg-white rounded-xl shadow-md py-4">
            <div className="border-4 border-red-500	 p-2 rounded-full">
              <HiArrowDownRight size={20} />
            </div>
            <div>
              <h2 className="text-md font-medium">Expenses</h2>
              <p className="text-sm">{expenseAmount} PLN</p>
            </div>
          </div>
        </section>
        <hr className="w-full h-[2px] bg-zinc-100 lg:hidden" />
        <section className="flex justify-between gap-4 w-full lg:w-auto">
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
