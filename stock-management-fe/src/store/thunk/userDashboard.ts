import baseService from "@/service/baseService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRandomStock = createAsyncThunk(
  "stocks/getRandomStock",
  async (_, thunkAPI) => {
    try {
      const response = await baseService.get("getRandomStock");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
