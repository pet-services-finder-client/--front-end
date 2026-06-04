import { getBusinesses } from "@/api/business";
import { BusinessSlider } from "@/components/BusinessSlider/BusinessSlider";
import { Map } from "@/components/Map/Map";
import { PetCareIntroSection } from "@/components/PetCareIntroSection";
import { PetServicesHero } from "@/components/PetServicesHero";
import type { BusinessListItem } from "@/types";

import type React from "react";
import { useEffect, useRef, useState } from "react";

export const HomePage: React.FC = () => {
  const [businesses, setBusinesses] = useState<BusinessListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setIsLoading(true);
    getBusinesses({ limit: 50, offset: 0 })
      .then((res) => {
        setBusinesses(res.items);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleScrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="relative grid grid-cols-4 md:grid-cols-12 gap-0">
      <PetServicesHero onExploreClick={handleScrollToMap} />
      <PetCareIntroSection />
      <div className="col-span-4 md:col-span-12  mt-8">
        <div ref={mapRef} className="grid grid-cols-12 gap-4 px-4 md:px-6">
          <div className="col-span-12 md:col-span-5 md:h-[754px]">
            <BusinessSlider businesses={businesses} isLoading={isLoading} />
          </div>
          <div className="col-span-12 md:col-span-7">
            <Map businesses={businesses} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
