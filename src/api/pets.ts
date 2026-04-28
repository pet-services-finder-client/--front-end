import type { PetCreate, PetRead, PetUpdate } from "@/types";
import { client } from "@/utils/axiosClient";

export const getPets = () => {
  return client.get<PetRead[]>("/pets");
};

export const getPet = (id: number) => {
  return client.get<PetRead>(`/pets/${id}`);
};

export const createPet = (data: PetCreate) => {
  return client.post<PetRead>("/pets", data);
};

export const updatePet = (id: number, data: PetUpdate) => {
  return client.patch<PetRead>(`/pets/${id}`, data);
};

export const deleatePet = (id: number) => {
  return client.delete(`/pets/${id}`);
};
