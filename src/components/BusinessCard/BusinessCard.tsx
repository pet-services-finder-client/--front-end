import type { BusinessListItem } from "@/types";
import { Heart } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  business: BusinessListItem;
}

export const BusinessCard: React.FC<Props> = ({ business }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link
      to={`/businesses/${business.id}`}
      className="bg-white rounded-2xl h-60 overflow-hidden shadow-sm border border-gray-100"
    >
      <div className="relative">
        <img
          src={business.cover_image_url ?? "/placeholder.jpg"}
          alt={business.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='140' fill='%23f3f4f6'%3E%3Crect width='400' height='140'/%3E%3C/svg%3E";
          }}
          className="w-full h-[140px] object-cover"
        />
        <button
          onClick={() => setLiked((prev) => !prev)}
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow"
        >
          <Heart
            size={16}
            className={liked ? "fill-blue-500 text-blue-500" : "text-gray-400"}
          />
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm">{business.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          {business.city}, {business.address}
        </p>
      </div>
    </Link>
  );
};
