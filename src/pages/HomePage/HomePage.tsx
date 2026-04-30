import { PetCareIntroSection } from "@/components/PetCareIntroSection";
import { PetServicesHero } from "@/components/PetServicesHero";

import type React from "react";

export const HomePage: React.FC = () => {
  return (
    <main className="relative">
      <PetServicesHero />
      <PetCareIntroSection />
    </main>
  );
};
