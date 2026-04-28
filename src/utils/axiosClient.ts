import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
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
