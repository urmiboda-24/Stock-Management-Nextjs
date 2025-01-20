import { DashboardAttr } from "@/interface/dashboard";
import baseService from "@/service/baseService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRandomStock } from "../thunk/userDashboard";

interface AuthState {
  stockList: DashboardAttr[];
}

const initialState: AuthState = {
  stockList: [],
};

const userDashboardSlice = createSlice({
  name: "dashboardReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRandomStock.fulfilled, (state, action) => {
      state.stockList = action.payload.data;
    });
  },
});

export default userDashboardSlice.reducer;
