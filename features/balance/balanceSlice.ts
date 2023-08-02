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
    updateTransactions(state, action: PayloadAction<TransactionData[]>) {
      state.totalAmount = 0;
      state.transactions = action.payload;
      state.transactions.forEach((transaction) => {
        if (transaction.type === 'Incomes') {
          state.totalAmount += transaction.amount;
        } else {
          state.totalAmount -= transaction.amount;
        }
      });
    },
  },
});

export const { updateTransactions } = balanceSlice.actions;

export default balanceSlice.reducer;
