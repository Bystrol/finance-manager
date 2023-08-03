'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setLoading } from '@/features/loading/loadingSlice';
import { updateTransactions } from '@/features/balance/balanceSlice';
import { getTransactions } from '@/lib/balance/getTransactions';
import { toast } from 'react-hot-toast';
import { HiArrowUpRight, HiArrowDownRight } from 'react-icons/hi2';
import { Progress } from 'flowbite-react';
import { FaBusAlt } from 'react-icons/fa';
import { IoFastFoodOutline } from 'react-icons/io5';
import { GiClothes } from 'react-icons/gi';

const Home = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state: RootState) => state.balance.transactions,
  );

  const totalAmount = useSelector((state: RootState) =>
    state.balance.totalAmount.toFixed(2),
  );

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === 'Incomes',
  );
  let incomeAmount = 0;
  incomeTransactions.forEach((transaction) => {
    incomeAmount += transaction.amount;
  });

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'Expenses',
  );
  let expensesAmount = 0;
  expenseTransactions.forEach((transaction) => {
    expensesAmount += transaction.amount;
  });

  const foodExpenses = transactions.filter(
    (transaction) => transaction.category === 'Food',
  );
  let foodTotalAmount = 0;
  foodExpenses.forEach((expense) => {
    foodTotalAmount += expense.amount;
  });

  const transportExpenses = transactions.filter(
    (transaction) => transaction.category === 'Transportation',
  );
  let transportTotalAmount = 0;
  transportExpenses.forEach((expense) => {
    transportTotalAmount += expense.amount;
  });

  const clothesExpenses = transactions.filter(
    (transaction) => transaction.category === 'Clothes',
  );
  let clothesTotalAmount = 0;
  clothesExpenses.forEach((expense) => {
    clothesTotalAmount += expense.amount;
  });

  const expensesTotalAmount =
    foodTotalAmount + transportTotalAmount + clothesTotalAmount;
  const foodPercentage = (foodTotalAmount / expensesTotalAmount) * 100;
  const transportPercentage =
    (transportTotalAmount / expensesTotalAmount) * 100;
  const clothesPercentage = (clothesTotalAmount / expensesTotalAmount) * 100;

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
      <section className="flex gap-4 w-full mt-4">
        <div className="flex justify-center items-center gap-6 w-1/2 bg-white rounded-xl shadow-md py-4">
          <div className="border-4 border-lime-300 p-2 rounded-full">
            <HiArrowUpRight size={20} />
          </div>
          <div>
            <h2 className="text-md font-medium">Income</h2>
            <p className="text-sm">{incomeAmount} PLN</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 w-1/2 bg-white rounded-xl shadow-md py-4">
          <div className="border-4 border-red-500	 p-2 rounded-full">
            <HiArrowDownRight size={20} />
          </div>
          <div>
            <h2 className="text-md font-medium">Expenses</h2>
            <p className="text-sm">{expensesAmount} PLN</p>
          </div>
        </div>
      </section>
      <hr className="w-full h-[2px] bg-zinc-100" />
      <section className="flex gap-4 w-full">
        <div className="flex flex-col w-1/2 bg-white rounded-xl shadow-md p-4 gap-2">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-zinc-300">
            <IoFastFoodOutline size={20} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-md font-medium">Food</h2>
            <p className="text-sm">{foodTotalAmount} PLN</p>
            <Progress progress={foodPercentage} color="green" size="sm" />
          </div>
        </div>
        <div className="flex flex-col w-1/2 bg-white rounded-xl shadow-md p-4 gap-2">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-zinc-300">
            <FaBusAlt size={20} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-md font-medium">Transport</h2>
            <p className="text-sm">{transportTotalAmount} PLN</p>
            <Progress progress={transportPercentage} color="green" size="sm" />
          </div>
        </div>
      </section>
      <section className="flex gap-4 w-full">
        <div className="flex flex-col w-1/2 bg-white rounded-xl shadow-md p-4 gap-2">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-zinc-300">
            <GiClothes size={20} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-md font-medium">Clothes</h2>
            <p className="text-sm">{clothesTotalAmount} PLN</p>
            <Progress progress={clothesPercentage} color="green" size="sm" />
          </div>
        </div>
        <div className="flex flex-col w-1/2 bg-white rounded-xl shadow-md p-4 gap-2">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-zinc-300"></div>
          <div className="flex flex-col gap-2">
            <h2 className="text-md font-medium">Empty</h2>
            <p className="text-sm">0 PLN</p>
            <Progress progress={0} color="green" size="sm" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
