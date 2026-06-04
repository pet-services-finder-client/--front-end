// Map.tsx
import type { BusinessListItem } from "@/types";
import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";
import React, { useRef, useState } from "react";

import vetIcon from "/icons/vetIcon.svg";
import groomingIcon from "/icons/groomingIcon.svg";
import petShopIcon from "/icons/petShopIcon.svg";
import { ModalCard } from "../ModalCard/ModalCard";
import { Skeleton } from "../ui/skeleton";

export const categoryMarkers: Record<string, string> = {
  vet_clinic: vetIcon,
  grooming: groomingIcon,
  pet_shop: petShopIcon,
};

interface Props {
  businesses: BusinessListItem[];
  isLoading: boolean;
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const Map: React.FC<Props> = ({ businesses, isLoading }) => {
  const [selected, setSelected] = useState<BusinessListItem | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[754px]" />
      ) : (
        <APIProvider apiKey={API_KEY}>
          <div ref={mapContainerRef} className="relative w-full h-[754px]">
            <GoogleMap
              style={{ width: "100%", height: "100%" }}
              defaultCenter={{ lat: 50.4501, lng: 30.5234 }}
              defaultZoom={12}
              gestureHandling="greedy"
            >
              {businesses.map((b) => (
                <Marker
                  key={b.id}
                  position={{ lat: b.latitude, lng: b.longitude }}
                  onClick={() => setSelected(b)}
                  icon={{
                    url: categoryMarkers[b.category.slug],
                    scaledSize: { width: 32, height: 32 } as any,
                  }}
                />
              ))}
            </GoogleMap>

            <ModalCard
              open={!!selected}
              onClose={() => setSelected(null)}
              business={selected}
              container={mapContainerRef.current}
            />
          </div>
        </APIProvider>
      )}
    </>
  );
};
