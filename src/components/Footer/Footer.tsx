import type React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white  border-gray-200">
      <div className="grid grid-cols-4 md:grid-cols-12 min-h-[160px] px-4 md:px-[108px] py-10 gap-y-8 md:gap-y-0">
        <div className="col-start-1 col-end-2 md:col-start-1 md:col-end-4 flex items-center justify-center md:justify-start">
          <Link
            to={"/"}
            className="flex flex-col items-center justify-center gap-2"
          >
            <span className="logo   text-primary">Pawly</span>
            <img src="./Logo.svg" alt="Logo" />
          </Link>
        </div>
        <div className="hidden md:block h-[195px] md:col-start-4 md:col-end-4 w-[1px] bg-secondary self-center" />
        <nav className="col-start-2 col-end-4 md:col-start-5 md:col-end-9 flex flex-col items-center justify-center gap-4">
          <h3 className="h3 text-base md:text-[28px]">Сервіси</h3>
          <Link to="/clinics" className="text-main text-sm md:text-[18px]">
            Клініки
          </Link>
          <Link to="/grooming" className="text-main text-sm md:text-[18px]">
            Грумінг
          </Link>
          <Link to="/shop" className="text-main text-sm md:text-[18px]">
            Зоомагазини
          </Link>
        </nav>
        <div className="hidden md:block h-[195px] md:col-start-10 md:col-end-10 w-[1px] bg-secondary self-center" />
        <nav className="col-start-4 col-end-5 md:col-start-11 md:col-end-13 flex flex-col items-center md:items-start justify-center gap-4 md:pl-16">
          <h3 className="h3 text-base md:text-[28px]">Слідкуйте за нами</h3>
          <Link to="/" className=" flex  items-center">
            <img src="./icons/Instagram.svg" alt="" />
            <span className="text-main text-sm md:text-[18px]">Instagram</span>
          </Link>
          <Link to="/" className=" flex  items-center">
            <img src="./icons/logos_facebook.svg" alt="" />
            <span className="text-main text-sm md:text-[18px]">Facebook</span>
          </Link>
          <Link to="/" className=" flex  items-center">
            <img src="./icons/Tiktok.svg" alt="" />
            <span className="text-main text-sm md:text-[18px]">TikTok</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
};
