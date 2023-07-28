import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TransactionData } from '@/interfaces/operation_interfaces';

interface BalanceSliceData {
  totalAmount: number;
  transactions: TransactionData[];
}

const initialBalanceSliceData: BalanceSliceData = {
  totalAmount: 0,
  transactions: [],
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState: initialBalanceSliceData,
  reducers: {
    addIncome(state, action: PayloadAction<TransactionData>) {
      state.transactions = [...state.transactions, action.payload];
      state.totalAmount += action.payload.amount;
    },
    addExpense(state, action: PayloadAction<TransactionData>) {
      state.transactions = [...state.transactions, action.payload];
      state.totalAmount -= action.payload.amount;
    },
    deleteTransaction(state, action: PayloadAction<{ id: string }>) {
      const transactionToDelete = state.transactions.find(
        (transaction) => transaction.id === action.payload.id,
      );

      if (transactionToDelete?.type === 'Incomes') {
        state.totalAmount -= transactionToDelete.amount;
      } else if (transactionToDelete?.type === 'Expenses') {
        state.totalAmount += transactionToDelete.amount;
      }

      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload.id,
      );
    },
  },
});

export const { addIncome, addExpense, deleteTransaction } =
  balanceSlice.actions;

export default balanceSlice.reducer;
