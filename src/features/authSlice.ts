import {
  changePassword,
  forgotPassword,
  getMe,
  login,
  register,
  resetPassword,
  updateMe,
} from "@/api/auth";
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

export const updateMeThunk = createAsyncThunk<
  UserRead,
  { full_name?: string; email?: string },
  { rejectValue: string }
>("auth/updateMe", async ({ full_name, email }, { rejectWithValue }) => {
  try {
    const response = await updateMe(full_name, email);

    return response;
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.detail ?? "Помилка оновлення профілю",
    );
  }
});

export const changePasswordThunk = createAsyncThunk<
  void,
  { old_password: string; new_password: string },
  { rejectValue: string }
>(
  "auth/changePassword",
  async ({ old_password, new_password }, { rejectWithValue }) => {
    try {
      await changePassword(old_password, new_password);
    } catch (e: any) {
      return rejectWithValue(
        e?.response?.data?.detail ?? "Помилка зміни паролю",
      );
    }
  },
);

export const forgotPasswordThunk = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>("auth/forgotPassword", async ({ email }, { rejectWithValue }) => {
  try {
    await forgotPassword(email);
  } catch (e: any) {
    return rejectWithValue(
      e?.response?.data?.detail ?? "Помилка відправки листа",
    );
  }
});

export const resetPasswordThunk = createAsyncThunk<
  void,
  { token: string; new_password: string },
  { rejectValue: string }
>(
  "auth/resetPassword",
  async ({ token, new_password }, { rejectWithValue }) => {
    try {
      await resetPassword(token, new_password);
    } catch (e: any) {
      return rejectWithValue(
        e?.response?.data?.detail ?? "Невірний або застарілий токен",
      );
    }
  },
);
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
      })
      .addCase(updateMeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateMeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
