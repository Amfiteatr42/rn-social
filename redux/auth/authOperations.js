import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";

export const registry = createAsyncThunk(
  "auth/registry",
  async ({ email, password, login }, thunkAPI) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      return { userId: user.uid, nickname: login };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      return { userId: user.uid, nickname: user.displayName };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
