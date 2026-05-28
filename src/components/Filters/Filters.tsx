import type React from "react";
import type { BusinessFilters } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  filters: BusinessFilters;
  onChange: (filters: BusinessFilters) => void;
}

export const Filters: React.FC<Props> = ({ filters, onChange }) => {
  const update = (patch: Partial<BusinessFilters>) => {
    onChange({ ...filters, ...patch });
  };

  const emergencyValue = filters.emergency_24_7
    ? "24_7"
    : filters.accepts_emergencies
      ? "accepts"
      : filters.open_now
        ? "open_now"
        : "all";

  const handleEmergencyChange = (value: string) => {
    update({
      emergency_24_7: value === "24_7" ? true : undefined,
      accepts_emergencies: value === "accepts" ? true : undefined,
      open_now: value === "open_now" ? true : undefined,
    });
  };

  return (
    <div className="flex flex-col gap-4 w-[220px] shrink-0">
      <div>
        <label className="text-sm text-gray-500 mb-1 block">Пошук</label>
        <input
          type="text"
          placeholder="Назва закладу..."
          value={filters.q ?? ""}
          onChange={(e) => update({ q: e.target.value || undefined })}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <div>
        <label className="text-sm text-gray-500 mb-1 block">Режим роботи</label>
        <Select value={emergencyValue} onValueChange={handleEmergencyChange}>
          <SelectTrigger className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 gap-2">
            <SelectValue placeholder="Оберіть..." />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-0 shadow-lg bg-white p-2 min-w-[220px]">
            <SelectItem
              value="all"
              className="rounded-lg py-3 px-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              Всі заклади
            </SelectItem>
            <SelectItem
              value="open_now"
              className="rounded-lg py-3 px-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              Відчинено зараз
            </SelectItem>
            <SelectItem
              value="accepts"
              className="rounded-lg py-3 px-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              Приймає екстрені випадки
            </SelectItem>
            <SelectItem
              value="24_7"
              className="rounded-lg py-3 px-3 text-sm text-gray-700 hover:bg-gray-50"
            >
              Цілодобово 24/7
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
