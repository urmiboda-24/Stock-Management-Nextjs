import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userDashboardSlice from "./slices/userDashboardSlice";
import loadingSlice from "./slices/loadingSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  userDashboard: userDashboardSlice,
  loading: loadingSlice,
});

export default rootReducer;
