'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setLoading } from '@/features/loading/loadingSlice';
import { updateTransactions } from '@/features/balance/balanceSlice';
import { getTransactions } from '@/lib/balance/getTransactions';
import { toast } from 'react-hot-toast';
import { HiArrowUpRight, HiArrowDownRight } from 'react-icons/hi2';
import useTransactionType from '@/hooks/useTransactionType';
import CategoryCart from '@/components/Home/CategoryCart';
import useCategoriesData from '@/hooks/useCategoriesData';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const totalAmount = useSelector((state: RootState) =>
    state.balance.totalAmount.toFixed(2),
  );

  const incomeAmount = useTransactionType('Incomes');
  const expenseAmount = useTransactionType('Expenses');

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
    <div className="flex flex-col items-center w-full gap-4">
      <h1 className="text-xl font-medium">Current balance</h1>
      <p className="text-4xl font-medium">{totalAmount} PLN</p>
      <div className="flex flex-wrap lg:flex-nowrap self-start justify-start w-full gap-4 mt-4">
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
        <section className="flex flex-wrap justify-between gap-4 w-full lg:w-auto">
          {categoriesArray.map((category) => {
            return (
              <CategoryCart
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
