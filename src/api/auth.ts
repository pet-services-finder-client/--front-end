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
