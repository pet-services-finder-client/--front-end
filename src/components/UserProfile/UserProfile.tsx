import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { Bell, Settings, SquarePen, Trash2 } from "lucide-react";
import type React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { UserProfileEditForm } from "./UserProfileEditForm";
import { UserProfileIcone } from "../icons/UserProfileIcone";

export const UserProfile: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [modal, setModal] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-6">
        <UserProfileIcone />
        <div className="flex-col">
          <div className="flex gap-11">
            <h2>{user?.full_name}</h2>
            <SquarePen
              className="cursor-pointer"
              onClick={() => setModal(true)}
            />
          </div>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3"></div>
      {modal && (
        <UserProfileEditForm open={modal} onClose={() => setModal(false)} />
      )}
    </div>
  );
};
