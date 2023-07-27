import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TransactionData } from '@/interfaces/operation_interfaces';
import { currentMonthName, currentYear } from '@/constants/date';

interface BalanceSliceData {
  month: string;
  year: number;
  totalAmount: number;
  transactions: TransactionData[];
}

const initialBalanceSliceData: BalanceSliceData = {
  month: currentMonthName,
  year: currentYear,
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
  },
});

export const { addIncome, addExpense } = balanceSlice.actions;

export default balanceSlice.reducer;
