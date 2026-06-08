import { BtnBack } from "@/components/BtnBack";
import { PetCreateForm } from "@/components/PetCreateForm";
import type React from "react";

export const PetCreatePage: React.FC = () => {
  return (
    <div>
      <BtnBack />
      <div className="grid grid-cols-4 md:grid-cols-12">
        <PetCreateForm />

        <div className="hidden md:flex col-start-8 col-end-13 items-center justify-center">
          <img
            className="w-full max-w-[520px] max-h-[462px] object-contain"
            src="./image/Cat.svg"
            alt="Cat"
          />
        </div>
      </div>
    </div>
  );
};
