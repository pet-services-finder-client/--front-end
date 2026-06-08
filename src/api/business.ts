import type {
  AutocompleteItem,
  BusinessDetail,
  BusinessFilters,
  BusinessListResponse,
  Category,
  Service,
} from "@/types";
import { client } from "@/utils/axiosClient";

export const getBusinesses = (filters: BusinessFilters = {}) => {
  const {
    limit,
    offset = 0,
    q,
    category_id,
    service_id,
    animal_type_id,
    accepts_emergencies,
    emergency_24_7,
    open_now,
    radius_km,
    lat,
    lon,
  } = filters;

  const params = new URLSearchParams({
    offset: String(offset),
  });
  if (limit !== undefined) params.set("limit", String(limit));

  if (q) {
    params.set("q", q);
  }

  if (category_id) params.set("category_id", String(category_id));
  if (service_id) params.set("service_id", String(service_id));
  if (animal_type_id) params.set("animal_type_id", String(animal_type_id));
  if (radius_km) params.set("radius_km", String(radius_km));
  if (lat !== undefined) params.set("lat", String(lat));
  if (lon !== undefined) params.set("lon", String(lon));
  if (accepts_emergencies !== undefined && accepts_emergencies !== "")
    params.set("accepts_emergencies", String(accepts_emergencies));
  if (emergency_24_7 !== undefined && emergency_24_7 !== "")
    params.set("emergency_24_7", String(emergency_24_7));
  if (open_now !== undefined && open_now !== "")
    params.set("open_now", String(open_now));

  return client.get<BusinessListResponse>(`/businesses?${params}`);
};

export const searchBusinesses = (query: string, limit = 6) => {
  return getBusinesses({ q: query, limit });
};

export const getBusinessById = (id: number) => {
  return client.get<BusinessDetail>(`/businesses/${id}`);
};

export const getCategories = () => {
  return client.get<Category[]>("/business-categories");
};

export const getServices = (categoryId?: number) => {
  const params = categoryId ? `?category_id=${categoryId}` : "";
  return client.get<Service[]>(`/services${params}`);
};

export const autocompleteBusinesses = (q: string, limit = 10) => {
  return client.get<AutocompleteItem[]>(
    `/businesses/autocomplete?q=${encodeURIComponent(q)}&limit=${limit}`,
  );
};
