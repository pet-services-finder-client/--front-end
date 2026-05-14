import { PetCareIntroSection } from "@/components/PetCareIntroSection";
import { PetServicesHero } from "@/components/PetServicesHero";

import type React from "react";

export const HomePage: React.FC = () => {
  return (
    <div className="relative grid grid-cols-4 md:grid-cols-12 gap-0">
      <PetServicesHero />
      <PetCareIntroSection />
    </div>
  );
};
