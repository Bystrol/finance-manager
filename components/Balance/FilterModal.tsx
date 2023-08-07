import { useState } from 'react';
import ModalCart from '@/components/UI/ModalCart';
import { monthsArray, yearsArray } from '@/constants/date';
import { checkIfDisabled } from '@/lib/balance/checkIfDisabled';
import { FilterProps } from '@/interfaces/operation_interfaces';
import { BalanceData } from '@/interfaces/operation_interfaces';

interface FilterModalProps {
  balanceData: BalanceData;
  setBalanceData: React.Dispatch<React.SetStateAction<BalanceData>>;
  onClick: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  balanceData,
  setBalanceData,
  onClick,
}) => {
  const initialFilterData = {
    month: balanceData.month,
    year: balanceData.year,
    type: balanceData.type,
    category: balanceData.category,
    isFilterModalVisible: false,
  };

  const [filterData, setFilterData] = useState<FilterProps>(initialFilterData);

  return (
    <ModalCart onClick={onClick}>
      <div className="flex w-3/4 justify-between items-center">
        <label htmlFor="month" className="font-bold">
          Month
        </label>
        <select
          name="month"
          id="month"
          defaultValue={balanceData.month}
          onChange={(e) => {
            setFilterData({
              ...filterData,
              month: e.target.value,
            });
          }}
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
        >
          {monthsArray.map((month) => {
            return (
              <option
                key={month}
                disabled={checkIfDisabled(month, filterData.year)}
                className={
                  checkIfDisabled(month, filterData.year)
                    ? 'bg-slate-600/10'
                    : ''
                }
              >
                {month}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex w-3/4 justify-between items-center">
        <label htmlFor="year" className="font-bold">
          Year
        </label>
        <select
          name="year"
          id="year"
          defaultValue={balanceData.year}
          onChange={(e) => {
            setFilterData({
              ...filterData,
              year: parseInt(e.target.value),
            });
          }}
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
        >
          {yearsArray.map((year) => {
            return <option key={year}>{year}</option>;
          })}
        </select>
      </div>
      <div className="flex w-3/4 justify-between items-center">
        <label htmlFor="type" className="font-bold">
          Type
        </label>
        <select
          name="type"
          id="type"
          defaultValue={balanceData.type}
          onChange={(e) => {
            setFilterData({
              ...filterData,
              type: e.target.value,
            });
          }}
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
        >
          <option>All</option>
          <option>Incomes</option>
          <option>Expenses</option>
        </select>
      </div>

      {filterData.type !== 'All' && (
        <div className="flex w-3/4 justify-between items-center">
          <label htmlFor="category" className="font-bold">
            Category
          </label>
          <select
            name="category"
            id="category"
            defaultValue={balanceData.category}
            onChange={(e) => {
              setFilterData({
                ...filterData,
                category: e.target.value,
              });
            }}
            className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
          >
            {filterData.type === 'Incomes' ? (
              <>
                <option>All</option>
                <option>Salary</option>
                <option>Transfer</option>
              </>
            ) : (
              <>
                <option>All</option>
                <option>Food</option>
                <option>Clothes</option>
                <option>Transport</option>
              </>
            )}
          </select>
        </div>
      )}

      <button
        className="w-1/2 h-10 bg-black text-white font-bold rounded-md hover:bg-zinc-700 mt-4"
        onClick={() =>
          setBalanceData({
            ...balanceData,
            month: filterData.month,
            year: filterData.year,
            type: filterData.type,
            category: filterData.category,
            isFilterModalVisible: filterData.isFilterModalVisible,
          })
        }
      >
        Filter
      </button>
    </ModalCart>
  );
};

export default FilterModal;
