import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickname: null,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    setUserId(state, action) {
      return { ...state, userId: action.payload };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(addPets.pending, handelPending);
  // },
});

export const authReducer = authSlice.reducer;
