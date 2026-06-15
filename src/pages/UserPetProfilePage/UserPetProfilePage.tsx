import { BtnBack } from "@/components/BtnBack";
import { PetProfile } from "@/components/PetProfile";
import { UserProfile } from "@/components/UserProfile";
import type React from "react";

export const UserPetProfilePage: React.FC = () => {
  return (
    <div className="grid  grid-cols-4 md:grid-cols-12">
      <div>
        <BtnBack />
      </div>
      <div className="col-start-1 col-end-4">
        <UserProfile />
        <PetProfile />
      </div>
    </div>
  );
};
