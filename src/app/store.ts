import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import petsReducer from "../features/petsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
