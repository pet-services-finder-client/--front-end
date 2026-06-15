import type { Token, UserCreate, UserRead } from "@/types";
import { client } from "@/utils/axiosClient";

export const login = (email: string, password: string) => {
  localStorage.setItem("token", "");
  return client.postForm<Token>("/auth/login", { username: email, password });
};

export const register = (data: UserCreate) => {
  return client.post<UserRead>("/auth/register", data);
};

export const getMe = () => {
  return client.get<UserRead>("/auth/me");
};

export const updateMe = (full_name?: string, email?: string) => {
  return client.patch<UserRead>("/auth/me", {
    full_name,
    email,
  });
};

export const changePassword = (old_password: string, new_password: string) => {
  return client.post<void>("/auth/change-password", {
    old_password,
    new_password,
  });
};

export const forgotPassword = (email: string) => {
  return client.post<void>("/auth/forgot-password", { email });
};

export const resetPassword = (token: string, new_password: string) => {
  return client.post<void>("/auth/reset-password", { token, new_password });
};
