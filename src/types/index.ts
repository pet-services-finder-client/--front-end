export type PetGender = "male" | "female" | "unknown";

export interface AnimalTypeRead {
  id: number;
  slug: string;
  name: string;
  icon_url: string | null;
  sort_order: number;
}

export interface UserBase {
  email: string;
  full_name: string | null;
}

export interface UserUpdate {
  full_name?: string;
  email?: string;
}

export interface UserCreate extends UserBase {
  password: string;
}

export interface UserRead extends UserBase {
  id: number;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface PetBase {
  name: string;
  breed: string | null;
  birth_date: string | null;
  gender: PetGender;
  notes: string | null;
}

export interface PetCreate extends PetBase {
  animal_type_id: number;
}

export interface PetUpdate {
  name?: string;
  animal_type_id?: number;
  breed?: string | null;
  birth_date?: string | null;
  gender?: PetGender;
  notes?: string | null;
}

export interface PetRead extends PetBase {
  id: number;
  owner_id: number;
  animal_type: AnimalTypeRead;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  icon_url: string | null;
  sort_order: number;
}

export interface Service {
  id: number;
  slug: string;
  name: string;
  category_id: number;
  sort_order: number;
}

export interface BusinessDetail {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  website: string | null;
  email: string | null;
  accepts_emergencies: boolean;
  emergency_24_7: boolean;
  cover_image_url: string | null;
  category: Category;
  owner: { id: number; full_name: string };
  animal_types: AnimalTypeRead[];
  services: Service[];
  hours: {
    day_of_week: number;
    is_closed: boolean;
    is_24h: boolean;
    open_time: string | null;
    close_time: string | null;
  }[];
  created_at: string;
  updated_at: string;
}

export interface BusinessListItem {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  accepts_emergencies: boolean;
  emergency_24_7: boolean;
  cover_image_url: string | null;
  category: Category;
  created_at: string;
}

export interface BusinessListResponse {
  items: BusinessListItem[];
  total: number;
  limit: number;
  offset: number;
}

export interface BusinessFilters {
  q?: string;
  category_id?: number;
  service_id?: number;
  animal_type_id?: number;
  accepts_emergencies?: boolean | string;
  emergency_24_7?: boolean | string;
  open_now?: boolean | string;
  radius_km?: number;
  lat?: number;
  lon?: number;
  limit?: number;
  offset?: number;
}
