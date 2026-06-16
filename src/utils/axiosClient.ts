import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.pawlyapp.me/api/v1",
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

instance.interceptors.request.use(async (config) => {
  if (import.meta.env.DEV) {
    if (config.url?.includes("autocomplete")) {
      await delay(150);
    } else {
      await delay(1200);
    }
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);
    return response.data;
  },
  async post<T>(url: string, data: unknown) {
    const response = await instance.post<T>(url, data);
    return response.data;
  },
  async postForm<T>(url: string, data: Record<string, string>) {
    const response = await instance.post<T>(url, new URLSearchParams(data), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  },
  async patch<T>(url: string, data: unknown) {
    const response = await instance.patch<T>(url, data);
    return response.data;
  },
  async delete(url: string) {
    return instance.delete(url);
  },
};
