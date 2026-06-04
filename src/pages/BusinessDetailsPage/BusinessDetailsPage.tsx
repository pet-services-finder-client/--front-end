import { getBusinessById } from "@/api/business";
import { BtnBack } from "@/components/BtnBack";
import { BusinessInfoCard } from "@/components/BusinessInfoCard/BusinessInfoCard";
import { Map } from "@/components/Map/Map";
import { Skeleton } from "@/components/ui/skeleton";
import type { BusinessDetail } from "@/types";
import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BusinessDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [busines, setBusines] = useState<BusinessDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getBusinessById(Number(id))
      .then((res) => setBusines(res))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <BtnBack />
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <Skeleton className="w-full md:max-w-[808px] h-[498px] rounded-2xl" />
          <Skeleton className="w-full max-w-[392px] h-[358px] rounded-2xl" />
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <BtnBack />
      <div className="grid grid-cols-4 md:grid-cols-12 gap-6 mt-4">
        {busines?.cover_image_url && (
          <img
            className="w-full md:max-w-[808px] max-h-[498px] col-span-4 md:col-span-8 object-cover rounded-2xl"
            src={busines.cover_image_url}
            alt={busines.name}
          />
        )}
        <div className="col-span-4">
          <BusinessInfoCard business={busines} />
        </div>
        {busines?.latitude && busines?.longitude && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${busines.latitude},${busines.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center col-span-4 md:col-start-9 md:col-end-13 justify-center gap-2 w-full h-[52px] rounded-full border border-blue-500 text-blue-500 font-medium hover:bg-blue-50 transition-colors"
          >
            Маршрут
          </a>
        )}
        <div className="col-span-4 md:col-start-9 md:col-end-13 ">
          <Map isLoading={isLoading} businesses={busines ? [busines] : []} />
        </div>
      </div>
    </div>
  );
};
