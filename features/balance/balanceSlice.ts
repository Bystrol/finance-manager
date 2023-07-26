import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TransactionData } from '@/interfaces/operation_interfaces';

interface BalanceData {
  totalAmount: number;
  transactions: TransactionData[];
}

const initialBalanceData: BalanceData = {
  totalAmount: 0,
  transactions: [],
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState: initialBalanceData,
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
