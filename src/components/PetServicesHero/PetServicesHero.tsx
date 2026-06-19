import type React from "react";
import { Button } from "../ui/button";

interface Props {
  onExploreClick?: () => void;
}

export const PetServicesHero: React.FC<Props> = ({ onExploreClick }) => {
  return (
    <section className="col-span-4 md:col-span-12 relative flex flex-col md:grid md:grid-cols-12 items-center pt-8 pb-0 overflow-hidden bg-white w-full">
      <div
        className="hidden md:block absolute pointer-events-none z-0"
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
        className="hidden md:block absolute pointer-events-none z-0"
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
        className="hidden md:block absolute pointer-events-none z-0"
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

      <div className=" order-2 md:order-1 md:col-start-1 md:col-end-8 flex flex-col gap-4 z-10 w-full">
        <h1 className="h1 text-[40px] md:text-[64px]">
          Знайдіть найкращі послуги для вашого улюбленця
        </h1>
        <h2 className="h2 text-[#4C4C4C] text-[20px] md:text-[36px]">
          Обирайте перевірені клініки, грумінг та
          <br className="hidden md:block" /> інші послуги у вашому місті
        </h2>
        <Button
          className="btn-primary w-fit min-w-[200px] border-primary text-white h-[52px] rounded-full mt-2 hover:text-primary hover:bg-transparent"
          onClick={onExploreClick}
        >
          Переглянути сервіси
        </Button>
      </div>

      <div className="order-1 md:order-2 md:col-start-9 md:col-end-13 flex justify-end items-end w-full">
        <img
          src="./image/dog.svg"
          alt="Dog"
          className="h-[220px] md:h-auto w-auto md:w-full object-contain object-bottom md:max-h-[496px]"
        />
      </div>
    </section>
  );
};
