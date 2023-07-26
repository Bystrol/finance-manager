import ModalCart from '@/components/UI/ModalCart';
import { monthsArray, yearsArray } from '@/constants/date';
import { checkIfDisabled } from '@/lib/balance/checkIfDisabled';
import { FilterProps } from '@/interfaces/operation_interfaces';

interface FilterModalProps {
  date: FilterProps;
  setDate: React.Dispatch<React.SetStateAction<FilterProps>>;
  onClick: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  date,
  setDate,
  onClick,
}) => {
  return (
    <ModalCart onClick={onClick}>
      <div className="flex w-3/4 justify-between items-center">
        <label htmlFor="month" className="font-bold">
          Month
        </label>
        <select
          name="month"
          id="month"
          defaultValue={date.month}
          onChange={(e) => {
            setDate({
              ...date,
              month: e.target.value,
            });
          }}
          className="w-3/5 h-10 border border-zinc-300 rounded-md px-2"
        >
          {monthsArray.map((month) => {
            return (
              <option
                key={month}
                disabled={checkIfDisabled(month)}
                className={checkIfDisabled(month) ? 'bg-slate-600/10' : ''}
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
          defaultValue={date.year}
          onChange={(e) => {
            setDate({
              ...date,
              year: parseInt(e.target.value),
            });
          }}
          className="w-3/5 h-10 border border-zinc-300 rounded-md"
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
          onChange={() => {}}
          className="w-3/5 h-10 border border-zinc-300 rounded-md"
        >
          <option>All</option>
          <option>Incomes</option>
          <option>Expenses</option>
        </select>
      </div>
      <div className="flex w-3/4 justify-between items-center">
        <label htmlFor="category" className="font-bold">
          Category
        </label>
        <select
          name="category"
          id="category"
          onChange={() => {}}
          className="w-3/5 h-10 border border-zinc-300 rounded-md"
        >
          <option>Food</option>
          <option>Clothes</option>
          <option>Travelling</option>
        </select>
      </div>
    </ModalCart>
  );
};

export default FilterModal;
