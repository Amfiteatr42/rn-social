import { createSlice } from "@reduxjs/toolkit";
import { login, logout, registry } from "./authOperations";

const initialState = {
  userId: null,
  nickname: null,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId(state, action) {
      return { ...state, userId: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registry.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.nickname = payload.nickname;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.nickname = payload.nickname;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state = initialState;
      });
  },
});

export const authReducer = authSlice.reducer;
