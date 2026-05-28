import { getBusinesses } from "@/api/business";
import { BusinessSlider } from "@/components/BusinessSlider/BusinessSlider";
import { Map } from "@/components/Map/Map";
import { PetCareIntroSection } from "@/components/PetCareIntroSection";
import { PetServicesHero } from "@/components/PetServicesHero";
import type { BusinessListItem } from "@/types";

import type React from "react";
import { useEffect, useState } from "react";

export const HomePage: React.FC = () => {
  const [businesses, setBusinesses] = useState<BusinessListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getBusinesses({ limit: 20, offset: 0 })
      .then((res) => {
        setBusinesses(res.items);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className="relative grid grid-cols-4 md:grid-cols-12 gap-0">
      <PetServicesHero />
      <PetCareIntroSection />
      <div className="col-span-4 md:col-span-12  mt-8">
        <div className="grid grid-cols-12 gap-4 px-4 md:px-6">
          <div className="col-span-5 h-[754px]">
            <BusinessSlider businesses={businesses} isLoading={isLoading} />
          </div>
          <div className="col-span-7">
            <Map businesses={businesses} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
