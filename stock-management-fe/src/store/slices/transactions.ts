import { createSlice } from "@reduxjs/toolkit";
import { getTransaction } from "../thunk/transactions";
import { ITransactionAttr } from "@/utils/interface/transactions";

interface TransactionsState {
  transactionList: ITransactionAttr[];
  total: string;
}

const initialState: TransactionsState = {
  transactionList: [],
  total: "",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransaction.fulfilled, (state, action) => {
      state.transactionList = action.payload.data.User;
      state.total = action.payload.data.total;
    });
  },
});

export default transactionsSlice.reducer;
