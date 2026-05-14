import { BtnBack } from "@/components/BtnBack";
import { PetCreateForm } from "@/components/PetCreateForm";
import type React from "react";

export const PetCreatePage: React.FC = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-12">
      <BtnBack />
      <PetCreateForm />
    </div>
  );
};
