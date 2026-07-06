import { getBusinesses } from "@/api/business";
import { BusinessSlider } from "@/components/BusinessSlider/BusinessSlider";
import { Filters } from "@/components/Filters/Filters";
import { Map } from "@/components/Map/Map";
import type { BusinessFilters, BusinessListItem } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CATEGORY_SLUGS: Record<string, string> = {
  clinics: "vet_clinic",
  grooming: "grooming",
  shop: "pet_shop",
};

const PRESET_TITLES: Record<string, string> = {
  clinics: "Клініки",
  grooming: "Грумінг",
  shop: "Зоомагазини",
};

const CATEGORY_IDS: Record<string, number> = {
  vet_clinic: 1,
  grooming: 2,
  pet_shop: 3,
};

export const Catalog = () => {
  const { category } = useParams();
  const [businesses, setBusinesses] = useState<BusinessListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const title = category ? PRESET_TITLES[category] : "Catalog";
  const slug = category ? CATEGORY_SLUGS[category] : null;

  const [filters, setFilters] = useState<BusinessFilters>({
    category_id: slug ? CATEGORY_IDS[slug] : undefined,
  });

  useEffect(() => {
    if (!slug) return;
    setFilters({ category_id: CATEGORY_IDS[slug] });
  }, [slug]);

  useEffect(() => {
    if (!filters.category_id) return;
    setIsLoading(true);

    getBusinesses(filters)
      .then((res) => setBusinesses(res.items))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [filters]);

  if (!category || !CATEGORY_SLUGS[category]) {
    return <h1>Not Found</h1>;
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <Filters filters={filters} onChange={setFilters} />
      <div className="col-span-4 md:col-span-12 mt-8">
        <div className="grid grid-cols-12 gap-4">
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
