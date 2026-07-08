import { getBusinesses } from "@/api/business";
import { BusinessSlider } from "@/components/BusinessSlider/BusinessSlider";
import { Filters } from "@/components/Filters/Filters";
import { Map } from "@/components/Map/Map";
import type { BusinessFilters, BusinessListItem } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

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
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState<BusinessListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const category = location.pathname.split("/")[1] || null;
  const isFixedCategory = category !== null && category !== "catalog";

  const title = isFixedCategory ? PRESET_TITLES[category!] : "Каталог";
  const slug = isFixedCategory ? CATEGORY_SLUGS[category!] : null;

  const filters: BusinessFilters = useMemo(() => {
    const result: BusinessFilters = {
      category_id: slug ? CATEGORY_IDS[slug] : undefined,
    };

    const q = searchParams.get("q");
    const service_id = searchParams.get("service_id");
    const categoryParam = searchParams.get("category");

    if (q) result.q = q;
    if (service_id) result.service_id = Number(service_id);

    if (!isFixedCategory && categoryParam && CATEGORY_IDS[categoryParam]) {
      result.category_id = CATEGORY_IDS[categoryParam];
    }

    if (searchParams.get("open_now") === "true") result.open_now = true;
    if (searchParams.get("accepts_emergencies") === "true")
      result.accepts_emergencies = true;
    if (searchParams.get("emergency_24_7") === "true")
      result.emergency_24_7 = true;

    return result;
  }, [slug, isFixedCategory, searchParams]);

  const handleFiltersChange = useCallback(
    (next: BusinessFilters) => {
      const params = new URLSearchParams();
      Object.entries(next).forEach(([key, value]) => {
        if (key === "category_id") return;
        if (value !== undefined && value !== "" && value !== null) {
          params.set(key, String(value));
        }
      });
      setSearchParams(params);
    },
    [setSearchParams],
  );

  useEffect(() => {
    setIsLoading(true);
    getBusinesses(filters)
      .then((res) => setBusinesses(res.items))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [filters]);

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <Filters filters={filters} onChange={handleFiltersChange} />
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
