import { ILogin } from "@/interface/auth";
import { checkCondition } from "@/utils/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userInfo: {
    role: string;
    userName: string;
  };
}

const initialState: AuthState = {
  userInfo: {
    role: "",
    userName: "",
  },
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILogin>) => {
      console.log("called");

      const { email } = action.payload;
      const roleType = checkCondition(
        email.includes("admin"),
        "admin",
        "user"
      ) as string;
      state.userInfo.role = roleType;
      state.userInfo.userName = email;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchTodo.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.list = action.payload;
  //     });
  //     builder.addCase(fetchTodo.pending, (state, action) => {
  //       state.isLoading = true;
  //     });
  //     builder.addCase(REHYDRATE, (state, action) => {
  //       console.log("Rehydrated state:", action.type);
  //     });
  //   },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
