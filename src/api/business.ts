import type { BusinessListItem, BusinessListResponse } from "@/types";
import { client } from "@/utils/axiosClient";

export const searchBusinesses = (query: string, limit = 6) => {
  return client.get<BusinessListResponse>(
    `/businesses?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
};

export const getBusines = (id: number) => {
  return client.get<BusinessListItem>(`/businesses/${id}`);
};
