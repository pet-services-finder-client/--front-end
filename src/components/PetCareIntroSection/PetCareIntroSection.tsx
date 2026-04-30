import type React from "react";

export const PetCareIntroSection: React.FC = () => {
  return (
    <section className="relative mt-[144px] ">
      <div
        className="absolute pointer-events-none w-[42px] h-[42px] "
        style={{
          top: "-50px",
          left: "46%",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "rotate(118deg)",
        }}
      />
      <div
        className="absolute pointer-events-none w-[42px] h-[42px] "
        style={{
          top: "-65px",
          left: "51%",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "rotate(118deg)",
        }}
      />
      <div
        className="absolute pointer-events-none w-[42px] h-[42px] "
        style={{
          top: "10px",
          left: "51%",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "rotate(118deg)",
        }}
      />
      <div
        className="absolute pointer-events-none w-[42px] h-[42px] "
        style={{
          top: "-10px",
          left: "56%",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "rotate(118deg)",
        }}
      />

      <h2 className="h2">All-in-one pet care platform</h2>
      <p className="text-main-light mt-4">
        A platform that enables pet owners to discover and book trusted services
        — including
        <br /> veterinary care, grooming, and pet shops — in a single,
        streamlined experience.
      </p>
    </section>
  );
};
