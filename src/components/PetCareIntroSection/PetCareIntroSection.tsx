import type React from "react";

export const PetCareIntroSection: React.FC = () => {
  return (
    <section className="relative col-span-4 md:col-span-12 mt-16 md:mt-[144px] ">
      <div
        className="hidden md:block absolute pointer-events-none w-[42px] h-[42px]"
        style={{
          top: "-90px",
          left: "46%",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "rotate(118deg)",
        }}
      />
      <div
        className="hidden md:block absolute pointer-events-none w-[42px] h-[42px]"
        style={{
          top: "-105px",
          left: "51%",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "rotate(118deg)",
        }}
      />
      <div
        className="hidden md:block absolute pointer-events-none w-[42px] h-[42px]"
        style={{
          top: "-20px",
          left: "51%",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "rotate(118deg)",
        }}
      />
      <div
        className="hidden md:block absolute pointer-events-none w-[42px] h-[42px]"
        style={{
          top: "-40px",
          left: "56%",
          backgroundImage: "url('/icons/paw.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "rotate(118deg)",
        }}
      />

      <h2 className="h2">Усе для догляду за улюбленцем — в одному місці</h2>
      <p className="text-main-light mt-4">
        Платформа для пошуку та запису до перевірених сервісів: ветеринарних
        клінік,
        <br /> грумінгу та зоомагазинів — в одному місці
      </p>
    </section>
  );
};
