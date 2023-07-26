import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TransactionData } from '@/interfaces/operation_interfaces';

interface BalanceData {
  incomes: TransactionData[];
}

const initialBalanceData: BalanceData = {
  incomes: [],
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState: initialBalanceData,
  reducers: {
    addIncome(state, action: PayloadAction<TransactionData>) {
      state.incomes = [...state.incomes, action.payload];
    },
  },
});

export const { addIncome } = balanceSlice.actions;

export default balanceSlice.reducer;
