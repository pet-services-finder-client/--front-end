import type { BusinessListItem } from "@/types";
import type { RefObject } from "react";
import type React from "react";
import { Link } from "react-router-dom";

interface Props {
  results: BusinessListItem[];
  loading: boolean;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

export const DropDown: React.FC<Props> = ({
  results,
  loading,
  dropdownRef,
}) => {
  return (
    <div
      className="absolute  top-10 -left-3 mt-1 w-[240px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
      ref={dropdownRef}
    >
      {loading ? (
        <div className="px-4 py-3 text-sm text-gray-400">Searching...</div>
      ) : results.length === 0 ? (
        <div className="px-4 py-3 text-sm text-gray-400">No results found</div>
      ) : (
        results.map((item) => (
          <Link
            to={`businesses/${item.id}`}
            key={item.id}
            type="button"
            className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
          >
            <div className="text-sm font-medium text-gray-800 truncate">
              {item.name}
            </div>
            <div className="text-xs text-gray-400 truncate">
              {item.category.name} · {item.city}
            </div>
          </Link>
        ))
      )}
    </div>
  );
};
