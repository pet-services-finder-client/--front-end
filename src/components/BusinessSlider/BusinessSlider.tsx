import type React from "react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/grid";
import type { BusinessListItem } from "@/types";
import { BusinessCard } from "../BusinessCard/BusinessCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  businesses: BusinessListItem[];
  isLoading?: boolean;
}

export const BusinessSlider: React.FC<Props> = ({ businesses, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 h-[754px] content-start">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[260px] rounded-2xl" />
        ))}
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center py-10">
        Нічого не знайдено
      </p>
    );
  }

  return (
    <>
      <div
        className="hidden md:grid grid-cols-2 gap-4 overflow-y-auto businesses-scroll pr-2 h-full"
        style={{ height: "754px" }}
      >
        {businesses.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>

      <div className="md:hidden flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory">
        {businesses.map((b) => (
          <div key={b.id} className="snap-start shrink-0 w-[260px]">
            <BusinessCard business={b} />
          </div>
        ))}
      </div>
    </>
  );
};
