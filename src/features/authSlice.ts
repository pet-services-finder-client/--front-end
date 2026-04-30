import { getMe, login, register } from "@/api/auth";
import type { UserCreate, UserRead } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: UserRead | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      await dispatch(getMeThunk());
      return data;
    } catch (e: any) {
      return rejectWithValue(
        e?.response?.data?.detail ?? "Невірний email або пароль",
      );
    }
  },
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: UserCreate, { dispatch, rejectWithValue }) => {
    try {
      const data = await register(payload);

      await dispatch(
        loginThunk({ email: payload.email, password: payload.password }),
      );
      return data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.detail ?? "Помилка реєстрації");
    }
  },
);

export const getMeThunk = createAsyncThunk("auth/me", async () => {
  return getMe();
});

const authSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
