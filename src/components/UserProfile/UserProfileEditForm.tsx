import type React from "react";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";

import { useForm } from "react-hook-form";
import type { UserUpdate } from "@/types";
import { updateMeThunk } from "@/features/authSlice";
import { Button } from "../ui/button";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const UserProfileEditForm: React.FC<Props> = ({ open, onClose }) => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<UserUpdate>({
    defaultValues: {
      full_name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name ?? "",
        email: user.email ?? "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserUpdate) => {
    try {
      await dispatch(
        updateMeThunk({
          full_name: data.full_name ?? "",
          email: data.email ?? "",
        }),
      ).unwrap();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent
        className="bg-white rounded-2xl px-7 pt-10 pb-6 max-w-[648px]
         data-[state=open]:animate-in
          data-[state=closed]:animate-out

          data-[state=open]:fade-in-0
          data-[state=closed]:fade-out-0

          data-[state=open]:zoom-in-95
          data-[state=closed]:zoom-out-95

          data-[state=open]:slide-in-from-bottom-4
          data-[state=closed]:slide-out-to-bottom-4

          data-[state=open]:duration-300
          data-[state=closed]:duration-200

          ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-14 w-full rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-14 w-full rounded-full" />
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <Label>FullName</Label>
              <Input
                {...register("full_name")}
                placeholder={user?.full_name ?? ""}
                className="rounded-full px-6 py-5 bg-gray-100"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input
                {...register("email")}
                placeholder={user?.email}
                className="rounded-full px-6 py-5 bg-gray-100"
              />
            </div>

            <Button className="mt-4 rounded-full bg-primary text-white">
              Save changes
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
