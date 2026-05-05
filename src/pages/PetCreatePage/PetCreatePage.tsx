import { BtnBack } from "@/components/BtnBack/BtnBack";
import { PetCreateForm } from "@/components/PetCreateForm";
import type React from "react";

export const PetCreatePage: React.FC = () => {
  return (
    <main>
      <BtnBack />
      <PetCreateForm />
    </main>
  );
};
