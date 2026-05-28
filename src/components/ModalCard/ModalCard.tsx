// ModalCard.tsx
import type React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { BusinessListItem } from "@/types";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  business: BusinessListItem | null;
  container?: HTMLElement | null;
}

export const ModalCard: React.FC<Props> = ({
  open,
  onClose,
  business,
  container,
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal container={container}>
        <DialogPrimitive.Overlay className="absolute inset-0 bg-transparent" />

        <DialogPrimitive.Content
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-white rounded-2xl px-4 pt-6 pb-4 w-[380px] shadow-xl z-50
            data-[state=open]:animate-in
            data-[state=closed]:animate-out
            data-[state=open]:fade-in-0
            data-[state=closed]:fade-out-0
            data-[state=open]:zoom-in-95
            data-[state=closed]:zoom-out-95
            data-[state=open]:duration-300
            data-[state=closed]:duration-200"
        >
          <DialogPrimitive.Close className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </DialogPrimitive.Close>

          <div className="flex gap-3 mb-4">
            {business?.cover_image_url && (
              <img
                src={business.cover_image_url}
                alt={business.name}
                className="w-[100px] h-[100px] rounded-xl object-cover shrink-0"
              />
            )}
            <div className="flex flex-col justify-center gap-2">
              <h2 className="font-semibold text-lg leading-tight">
                {business?.name}
              </h2>
              <div className="text-sm flex items-start gap-1">
                <span>📍</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Адреса</p>
                  <p className="text-gray-700">
                    {business?.address}, {business?.city}
                  </p>
                </div>
              </div>
              {business?.accepts_emergencies && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full w-fit">
                  Приймає екстрені випадки
                </span>
              )}
              {business?.emergency_24_7 && (
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full w-fit">
                  Цілодобово 24/7
                </span>
              )}
            </div>
          </div>

          <Link
            to={`/businesses/${business?.id}`}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700
              text-white font-medium py-3 rounded-xl transition-colors"
          >
            Детальніше
          </Link>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
