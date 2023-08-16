import { useSelector } from "react-redux";
import { BalanceData } from "@/interfaces/operation_interfaces";
import { RootState } from "@/store/store";

const useFilteredTransactions = (balanceData: BalanceData) => {
    const transactions = useSelector(
        (state: RootState) => state.balance.transactions,
      );
      
    let filteredTransactions;

    if (balanceData.type === 'All') {
      return (filteredTransactions = transactions.filter(
        (transaction) =>
          transaction.month === balanceData.month &&
          transaction.year === balanceData.year,
      ));
    } else if (balanceData.category === 'All') {
      return (filteredTransactions = transactions.filter(
        (transaction) =>
          transaction.month === balanceData.month &&
          transaction.year === balanceData.year &&
          transaction.type === balanceData.type,
      ));
    } else {
      return (filteredTransactions = transactions.filter(
        (transaction) =>
          transaction.month === balanceData.month &&
          transaction.year === balanceData.year &&
          transaction.type === balanceData.type &&
          transaction.category === balanceData.category,
      ));
    }
  };

export default useFilteredTransactions