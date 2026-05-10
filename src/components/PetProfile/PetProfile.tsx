import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { deletePetThunk, getPetsThunk } from "@/features/petsSlice";
import { SquarePen, Trash2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { PetProfileEditForm } from "./PetProfileEditForm";
import type { PetRead } from "@/types";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";

export const PetProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedPet, setSelectedPet] = useState<PetRead | null>(null);

  const { pets } = useAppSelector((state) => state.pets);
  useEffect(() => {
    dispatch(getPetsThunk());
  }, [dispatch]);

  const handelDeleatPet = async (petId: number) => {
    try {
      await dispatch(deletePetThunk(petId)).unwrap();
    } catch (error) {
      console.error("Failed to delete pet:", error);
    }
  };
  if (!pets.length) {
    return (
      <main>
        <p>No pets found.</p>
      </main>
    );
  }

  return (
    <main className="max-w-[384px]">
      {pets.map((pet) => (
        <div key={pet.id}>
          <div className="w-full bg-gray-50 h-1 mb-6" />
          <div className="flex items-center gap-6 ">
            <div className="h-[125px] w-[125px] rounded-full bg-gray-100" />
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
            <Link to="/petCreate" className="text-small text-primary">
              + Add another pet
            </Link>
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-20">
                <span className="text-main-light bg-accent-card rounded-full py-1 pl-4 pr-16">
                  Gender
                </span>
                <span className="text-main-light"> {pet.gender}</span>
              </div>
            </div>
            <div className="flex items-center  gap-4">
              <span className="text-main-light bg-accent-card rounded-full py-1 px-4 min-w-[140px]">
                Birth date
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
            <div className="flex gap-1 ">
              <Button
                id="trash2"
                className="bg-transparent"
                onClick={() => handelDeleatPet(pet.id)}
              >
                <Trash2 className="cursor-pointer" />
              </Button>
              <Label htmlFor="trash2" className="cursor-pointer">
                {" "}
                Delete profil
              </Label>
            </div>
          </div>
        </div>
      ))}

      {selectedPet && (
        <PetProfileEditForm
          pet={selectedPet}
          open={!!selectedPet}
          onClose={() => setSelectedPet(null)}
        />
      )}
    </main>
  );
};
