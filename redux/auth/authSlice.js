import { createSlice } from "@reduxjs/toolkit";
import { login, logout, registry } from "./authOperations";

const initialState = {
  userId: null,
  nickname: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, { payload }) {
      return { ...state, userId: payload.uid, nickname: payload.displayName };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registry.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.nickname = payload.nickname;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.userId = payload.userId;
        state.nickname = payload.nickname;
      })
      .addCase(logout.fulfilled, (state) => {
        state = initialState;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setUserData } = authSlice.actions;
