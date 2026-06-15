import type React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import z from "zod";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AnimalTypeRead, PetCreate } from "@/types";
import { createPetThunk } from "@/features/petsSlice";
import { useEffect, useState } from "react";
import { getAnimalTypes } from "@/api/animalTypes";
import { useAppSelector } from "@/app/hooks";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";

export const CreateShema = z.object({
  type: z.string().min(1, "Type is required"),
  name: z.string().min(1, "Name is required"),
  breed: z.string().optional(),
  gender: z.enum(["male", "female", "unknown"]),
});

export type CreateFormValues = z.infer<typeof CreateShema>;

export const PetCreateForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useAppSelector((state: RootState) => state.pets);
  const [animalTypes, setAnimalTypes] = useState<AnimalTypeRead[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateFormValues>({
    resolver: zodResolver(CreateShema),
    defaultValues: {
      type: "",
      name: "",
      breed: "",
      gender: "unknown" as const,
    },
  });

  const mapFormToPetCreate = (data: CreateFormValues): PetCreate => {
    return {
      animal_type_id: Number(data.type) || 0,
      name: data.name,
      breed: data.breed ?? null,
      gender: data.gender,
      birth_date: null,
      notes: null,
    };
  };

  const onSubmit = async (data: CreateFormValues) => {
    const payload = mapFormToPetCreate(data);
    await dispatch(createPetThunk(payload));

    navigate("/profile");
  };

  useEffect(() => {
    getAnimalTypes().then((data) => {
      setAnimalTypes(data);
    });
  }, []);

  if (loading.create) {
    return (
      <div className="max-w-[597px] mt-7 space-y-6">
        <Skeleton className="h-8 w-1/2" />

        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    );
  }
  return (
    <div className="col-span-4 max-w-[597px] mt-7 ">
      <h1 className="h2 mb-4">Розкажіть про вашого улюбленця</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="type">Тип тварини</Label>
            <Select onValueChange={(value) => setValue("type", value)}>
              <SelectTrigger className="w-full px-6 py-[18px] rounded-full border-gray-200 focus:ring-primary">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Тип тварини</SelectLabel>
                  {animalTypes.map((type) => (
                    <SelectItem
                      key={type.id}
                      className=" rounded-lg px-3 py-2
    data-[highlighted]:bg-gray-200
    data-[highlighted]:text-black
    cursor-pointer"
                      value={String(type.id)}
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-500"> {errors.type.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Ім’я</Label>
            <Input
              type="text"
              id="name"
              placeholder="Ім’я"
              {...register("name")}
              className=" rounded-full px-6 py-[18px] !bg-gray-100 border-gray-200 placeholder:secondary-text focus-visible:ring-primary"
            />
            {errors.name && (
              <p className="text-sm text-red-500"> {errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="breed">Порода</Label>
            <Input
              type="text"
              id="breed"
              placeholder="Порода"
              {...register("breed")}
              className=" rounded-full  px-6 py-[18px] !bg-gray-100 border-gray-200 placeholder:secondary-text focus-visible:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="gender">Стать</Label>
            <Select
              onValueChange={(value) =>
                setValue("gender", value as "male" | "female" | "unknown")
              }
            >
              <SelectTrigger className=" w-full px-6 py-[18px] rounded-full border-gray-200 focus:ring-primary">
                <SelectValue placeholder="Стать" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem
                    className=" rounded-lg px-3 py-2
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
            {errors.gender && (
              <p className="text-sm text-red-500"> {errors.gender.message}</p>
            )}
          </div>
          <Button className="w-full rounded-full px-6 py-[18px] text-white">
            Finish
          </Button>
        </div>
      </form>
    </div>
  );
};
