import type { AnimalTypeRead } from "@/types";
import { client } from "@/utils/axiosClient";

export const getAnimalTypes = () => {
  return client.get<AnimalTypeRead>("/animal-types");
};
