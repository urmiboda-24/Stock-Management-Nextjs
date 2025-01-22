import {
  ILoginResponse,
  ILoginPayload,
  IRegisterPayload,
  IRegisterResponse,
} from "@/utils/interface/auth";
import baseService from "@/service/baseService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export const loginUser = createAsyncThunk<ILoginResponse, ILoginPayload>(
  "auth/loginUser",
  async (payload: ILoginPayload) => {
    const response: AxiosResponse<ILoginResponse> = await baseService.post(
      "signIn",
      payload
    );
    return response.data;
  }
);

export const registerUser = createAsyncThunk<
  IRegisterResponse,
  IRegisterPayload
>("auth/registerUser", async (payload: IRegisterPayload) => {
  const response: AxiosResponse<IRegisterResponse> = await baseService.post(
    "signUp",
    payload
  );
  return response.data;
});
