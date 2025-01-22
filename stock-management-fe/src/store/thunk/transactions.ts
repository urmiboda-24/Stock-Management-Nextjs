import baseService from "@/service/baseService";
import {
  IPagination,
  ITransactionResponse,
} from "@/utils/interface/transactions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export const getTransaction = createAsyncThunk<
  ITransactionResponse,
  IPagination
>("transaction/getTransaction", async (payload: IPagination) => {
  const response: AxiosResponse<ITransactionResponse> = await baseService.post(
    "transaction",
    payload
  );
  return response.data;
});
