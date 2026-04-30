import type React from "react";
import { Button } from "../ui/button";

export const PetServicesHero: React.FC = () => {
  return (
    <section className="relative grid  md:grid-cols-12 items-end  pt-8 pb-0 overflow-hidden bg-white ">
      <div
        className="absolute pointer-events-none  z-0"
        style={{
          top: "10%",
          left: "40%",
          width: "42px",
          height: "42px",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute pointer-events-none  z-0"
        style={{
          top: "3%",
          left: "42%",
          width: "42px",
          height: "42px",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute pointer-events-none  z-0"
        style={{
          top: "3%",
          left: "46.1%",
          width: "42px",
          height: "42px",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="col-start-1 col-end-8 flex flex-col gap-4  z-10">
        <h1 className="h1">
          Find pet services <br />
          near you
        </h1>
        <h2 className="h2 text-[#4C4C4C]">
          Explore top-rated clinics, grooming,
          <br /> and more based on your location.
        </h2>
        <Button className="btn-primary w-fit min-w-[200px] text-white h-[52px] rounded-full mt-2">
          Explore places
        </Button>
      </div>

      <div className="col-start-9 col-end-13 flex items-end justify-end self-end">
        <img
          src="./image/dog.svg"
          alt="Dog"
          className="object-contain object-bottom w-full max-h-[496px]"
        />
      </div>
    </section>
  );
};
