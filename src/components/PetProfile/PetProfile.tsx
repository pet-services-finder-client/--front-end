import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { deletePetThunk, getPetsThunk } from "@/features/petsSlice";
import { SquarePen, Trash2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { PetProfileEditForm } from "./PetProfileEditForm";
import type { PetRead } from "@/types";

import { Link } from "react-router-dom";
import { toast } from "sonner";
import { PetProfileIcon } from "../icons/PetProfileIcon";

export const PetProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedPet, setSelectedPet] = useState<PetRead | null>(null);
  const { pets } = useAppSelector((state) => state.pets);

  useEffect(() => {
    dispatch(getPetsThunk());
  }, [dispatch]);

  const handleDeletePet = async (petId: number) => {
    try {
      await dispatch(deletePetThunk(petId)).unwrap();
      toast.success("Pet deleted successfully");
    } catch (error) {
      toast.error("Failed to delete pet. Please try again.");
    }
  };

  if (!pets.length) {
    return (
      <main className="flex flex-col">
        <p>No pets found.</p>
        <Link to="/petCreate" className="text-small text-primary">
          + Add your pet
        </Link>
      </main>
    );
  }

  return (
    <div className="max-w-[384px]">
      {pets.map((pet) => (
        <div key={pet.id}>
          <div className="w-full bg-gray-50 h-1 mb-6" />
          <div className="flex items-center gap-6">
            <PetProfileIcon />
            <div className="flex-col">
              <div className="flex gap-11">
                <h2 className="h2">{pet.name}</h2>
                <SquarePen
                  className="cursor-pointer"
                  onClick={() => setSelectedPet(pet)}
                />
              </div>
              <p>{pet.breed}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-20">
                <span className="text-main-light bg-accent-card rounded-full py-1 pl-4 pr-16">
                  Стать
                </span>
                <span className="text-main-light">{pet.gender}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-main-light bg-accent-card rounded-full py-1 px-4 min-w-[140px]">
                Дата народження{" "}
              </span>
              <span className="text-main-light">{pet.birth_date}</span>
            </div>
            {pet.notes && (
              <div className="flex flex-col gap-2">
                <span className="text-main-light bg-[#DDE9FC] rounded-full py-1 px-4 w-fit">
                  Notes
                </span>
                <p className="text-main-light">{pet.notes}</p>
              </div>
            )}
            <button
              className="flex items-center gap-1 text-red-500 hover:text-red-600 transition w-fit"
              onClick={() => handleDeletePet(pet.id)}
            >
              <Trash2 size={16} />
              <span className="text-sm">Delete profile</span>
            </button>
          </div>
        </div>
      ))}
      <Link to="/petCreate" className="text-small text-primary">
        + Add another pet
      </Link>
      {selectedPet && (
        <PetProfileEditForm
          pet={selectedPet}
          open={!!selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}
    </div>
  );
};
