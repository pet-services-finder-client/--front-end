import type React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { PetGender, PetRead, PetUpdate } from "@/types";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useForm } from "react-hook-form";
import { updatePetThunk } from "@/features/petsSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect } from "react";

interface Props {
  pet: PetRead;
  open: boolean;
  onClose: () => void;
}

export const PetProfileEditForm: React.FC<Props> = ({ pet, open, onClose }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.pets);
  const { register, handleSubmit, setValue, reset } = useForm<PetUpdate>();

  const onSubmit = async (data: PetUpdate) => {
    const updatedData: PetUpdate = {};

    if (data.name?.trim()) {
      updatedData.name = data.name;
    }

    if (data.breed !== undefined && data.breed !== "") {
      updatedData.breed = data.breed;
    }

    if (data.birth_date) {
      updatedData.birth_date = data.birth_date;
    }

    if (data.gender) {
      updatedData.gender = data.gender as PetGender;
    }

    if (data.notes !== undefined && data.notes !== "") {
      updatedData.notes = data.notes;
    }

    updatedData.animal_type_id = pet.animal_type.id;

    if (Object.keys(updatedData).length === 1) {
      onClose();
      return;
    }

    try {
      await dispatch(
        updatePetThunk({
          id: pet.id,
          data: updatedData,
        }),
      ).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update pet:", error);
    }
  };

  useEffect(() => {
    if (pet) {
      reset({
        name: pet.name ?? "",
        breed: pet.breed ?? "",
        gender: pet.gender ?? "",
        birth_date: pet.birth_date ?? "",
        notes: pet.notes ?? "",
      });
    }
  }, [pet, reset]);

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
          <DialogTitle>Edit Pet</DialogTitle>
        </DialogHeader>

        {loading.update ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-14 w-full rounded-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-14 w-full rounded-full" />
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
            {/* Name */}
            <div className="flex flex-col gap-1">
              <Label>Name</Label>
              <Input
                {...register("name")}
                placeholder={pet.name}
                className="rounded-full px-6 py-5 bg-gray-100"
              />
            </div>

            {/* Breed */}
            <div className="flex flex-col gap-1">
              <Label>Breed</Label>
              <Input
                {...register("breed")}
                placeholder={pet.breed ?? ""}
                className="rounded-full px-6 py-5 bg-gray-100"
              />
            </div>

            {/* Birth date */}
            <div className="flex flex-col gap-1">
              <Label>Birth date</Label>
              <Input
                type="date"
                {...register("birth_date")}
                className="rounded-full px-6 py-5 bg-gray-100"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2">
              <Label>Gender</Label>
              <Select
                onValueChange={(value) =>
                  setValue("gender", value as "male" | "female" | "unknown")
                }
              >
                <SelectTrigger className="rounded-full px-6 py-4">
                  <SelectValue placeholder={pet.gender} />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem
                      className="rounded-lg px-3 py-2
    data-[highlighted]:bg-gray-200
    data-[highlighted]:text-black
    cursor-pointer"
                      value="male"
                    >
                      Male
                    </SelectItem>
                    <SelectItem
                      className="rounded-lg px-3 py-2
    data-[highlighted]:bg-gray-200
    data-[highlighted]:text-black
    cursor-pointer"
                      value="female"
                    >
                      Female
                    </SelectItem>
                    <SelectItem
                      className="rounded-lg px-3 py-2
    data-[highlighted]:bg-gray-200
    data-[highlighted]:text-black
    cursor-pointer"
                      value="unknown"
                    >
                      Unknown
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1">
              <Label>Notes</Label>
              <Textarea
                {...register("notes")}
                placeholder={pet.notes ?? ""}
                className="bg-gray-100"
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
