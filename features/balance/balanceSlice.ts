import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  TransactionData,
  EditModalData,
} from '@/interfaces/operation_interfaces';

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
    editTransaction(state, action: PayloadAction<EditModalData>) {
      let transactionToEdit = state.transactions.find(
        (transaction) => transaction.id === action.payload.id,
      );

      let transactionToEditIndex = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id,
      );

      if (transactionToEdit?.type === 'Incomes') {
        state.totalAmount =
          state.totalAmount - transactionToEdit.amount + action.payload.amount;
      } else if (transactionToEdit?.type === 'Expenses') {
        state.totalAmount =
          state.totalAmount + transactionToEdit.amount - action.payload.amount;
      }

      state.transactions[transactionToEditIndex] = {
        ...transactionToEdit!,
        description: action.payload.description,
        category: action.payload.category,
        icon: action.payload.icon,
        amount: action.payload.amount,
      };
    },
  },
});

export const { addIncome, addExpense, deleteTransaction, editTransaction } =
  balanceSlice.actions;

export default balanceSlice.reducer;
