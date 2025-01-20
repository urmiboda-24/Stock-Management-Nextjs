"use client";
import { checkCondition } from "@/utils/helper";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser, registerUser } from "../thunk/auth";

interface AuthState {
  userInfo: {
    role: string;
    userName: string;
  };
  token: string;
}

const initialState: AuthState = {
  userInfo: {
    role: "",
    userName: "",
  },
  token: "",
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logoutUser: () => {
      Cookies.remove("role");
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data, token } = action.payload;
        if (data && data?.length && token) {
          state.userInfo.role = checkCondition(
            data[0].email.includes("admin"),
            "admin",
            "user"
          ) as string;
          state.userInfo.userName = data[0].full_name;
          state.token = token;
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("register-response", action.payload.message);
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
