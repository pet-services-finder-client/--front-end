import type React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white  border-gray-200">
      <div className="grid md:grid-cols-12  min-h-[160px] px-[108px] py-10">
        <div className="flex flex-col col-start-1 col-end-4 items-start justify-center gap-2">
          <Link
            to={"/"}
            className="flex flex-col items-center justify-center gap-2"
          >
            <span className="logo   text-primary">Pawly</span>
            <img src="./Logo.svg" alt="Logo" />
          </Link>
        </div>
        <div className="h-[195px] col-start-4 col-end-4 w-[1px] bg-secondary" />
        <nav className="flex flex-col col-start-5 col-end-9 items-center justify-center gap-4 px-8">
          <h3 className="h3">Services</h3>
          <Link to="/clinics" className="text-main">
            Clinics
          </Link>
          <Link to="/grooming" className="text-main">
            Grooming
          </Link>
          <Link to="/shop" className="text-main">
            Shop
          </Link>
        </nav>
        <div className="h-[195px] col-start-10 col-end-10  w-[1px] bg-secondary" />
        <nav className="flex flex-col  col-start-11 col-end-13    justify-center gap-4 pl-16">
          <h3 className="h3">Follow us</h3>
          <Link to="/" className=" flex  items-center">
            <img src="./icons/Instagram.svg" alt="" />
            <span className="text-main">Instagram</span>
          </Link>
          <Link to="/" className=" flex  items-center">
            <img src="./icons/logos_facebook.svg" alt="" />
            <span className="text-main">Facebook</span>
          </Link>
          <Link to="/" className=" flex  items-center">
            <img src="./icons/Tiktok.svg" alt="" />
            <span className="text-main">TikTok</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
};
