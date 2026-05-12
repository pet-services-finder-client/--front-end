import { BtnBack } from "@/components/BtnBack";
import { PetProfile } from "@/components/PetProfile";
import { UserProfile } from "@/components/UserProfile";
import type React from "react";
import { useState } from "react";

export const UserPetProfilePage: React.FC = () => {
  return (
    <main>
      <BtnBack />
      <div>
        <UserProfile />
        <PetProfile />
      </div>
    </main>
  );
};
