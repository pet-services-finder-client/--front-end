import type { BusinessDetail } from "@/types";
import { Clock, MapPin, Phone } from "lucide-react";
import type React from "react";

interface Props {
  business: BusinessDetail | null;
}

export const BusinessInfoCard: React.FC<Props> = ({ business }) => {
  const todayHours = business?.hours.find(
    (h) => h.day_of_week === new Date().getDay(),
  );

  const hoursLabel = todayHours?.is_closed
    ? "Зачинено"
    : todayHours?.is_24h
      ? "Цілодобово"
      : todayHours
        ? `${todayHours.open_time?.slice(0, 5)} - ${todayHours.close_time?.slice(0, 5)}`
        : null;

  if (!business) return null;
  return (
    <div className="w-full max-w-[392px] bg-accent-card rounded-2xl p-4 shadow-sm border border-gray-100 ">
      <div className="flex justify-between items-start mb-2">
        <h2 className="h3">{business.name}</h2>
      </div>

      <div className="flex gap-2 items-start">
        <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-gray-400">Адреса</p>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-blue-500 hover:underline transition-colors"
          >
            {business.city}, {business.address}
          </a>
        </div>
      </div>
      {hoursLabel && (
        <div className="flex gap-2 items-start">
          <Clock size={16} className="text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Режим роботи</p>
            <p className="text-sm">{hoursLabel}</p>
          </div>
        </div>
      )}

      {business.phone && (
        <div className="flex gap-2 items-start mb-4">
          <Phone size={16} className="text-gray-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Контакти</p>
            <a
              href={`tel:${business.phone}`}
              className="text-sm hover:text-blue-500 hover:underline transition-colors"
            >
              {business.phone}
            </a>
          </div>
        </div>
      )}

      {business.services.length > 0 && (
        <>
          <hr className="mb-3" />
          <p className="font-semibold text-sm mb-2">Послуги:</p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {business.services.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
