import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { Bell, Settings, SquarePen, Trash2 } from "lucide-react";
import type React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { UserProfileEditForm } from "./UserProfileEditForm";

export const UserProfile: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [modal, setModal] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="h-[125px] w-[125px] rounded-full bg-gray-100" />
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
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex gap-1">
          <Button className="bg-transparent" id="bell">
            <Bell className="cursor-pointer" />
          </Button>
          <Label htmlFor="bell" className="cursor-pointer">
            Notifications
          </Label>
        </div>
        <div className="flex gap-1">
          <Button id="settings" className="bg-transparent">
            <Settings className="cursor-pointer" />
          </Button>
          <Label htmlFor="settings" className="cursor-pointer">
            Account Settings
          </Label>
        </div>
        <div className="flex gap-1 ">
          <Button id="trash2" className="bg-transparent">
            <Trash2 className="cursor-pointer" />
          </Button>
          <Label htmlFor="trash2" className="cursor-pointer">
            {" "}
            Delete profil
          </Label>
        </div>
      </div>
      {modal && (
        <UserProfileEditForm open={modal} onClose={() => setModal(false)} />
      )}
    </div>
  );
};
