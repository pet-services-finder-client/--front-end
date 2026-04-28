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
