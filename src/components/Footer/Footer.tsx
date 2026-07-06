import type React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-gray-200">
      <div className="flex flex-col items-center gap-8 px-4 py-10 md:grid md:grid-cols-12 md:min-h-[160px] md:px-[108px] md:gap-y-0 md:items-stretch">
        <div className="flex items-center justify-center md:col-start-1 md:col-end-4 md:justify-start md:items-center">
          <Link to={"/"} className="flex flex-col items-center gap-4 w-fit">
            <span className="logo text-primary">Pawly</span>
            <img src="./Logo.svg" alt="Logo" className="w-8 h-8" />
          </Link>
        </div>

        <div className="hidden md:block h-[195px] md:col-start-4 md:col-end-4 w-[1px] bg-secondary self-center" />

        <div className="grid grid-cols-2 gap-8 w-full md:contents">
          <nav className="flex flex-col items-center md:items-center justify-center gap-4 md:col-start-5 md:col-end-9">
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

          <nav className="flex flex-col items-center md:items-start justify-center gap-4 md:col-start-11 md:col-end-13">
            <h3 className="h3 text-base md:text-[28px]">Слідкуйте за нами</h3>
            {[
              { src: "./icons/Instagram.svg", label: "Instagram" },
              { src: "./icons/logos_facebook.svg", label: "Facebook" },
              { src: "./icons/Tiktok.svg", label: "TikTok" },
            ].map(({ src, label }) => (
              <Link key={label} to="/" className="flex items-center gap-2 h-6">
                <img src={src} alt="" className="w-6 h-6 object-contain" />
                <span className="text-main text-sm md:text-[18px] leading-6">
                  {label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
