import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userDashboardSlice from "./slices/userDashboardSlice";
import loadingSlice from "./slices/loadingSlice";
import transactionsSlice from "./slices/transactions";

const rootReducer = combineReducers({
  auth: authSlice,
  userDashboard: userDashboardSlice,
  loading: loadingSlice,
  transaction: transactionsSlice,
});

export default rootReducer;
