import type React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center md:h-[91px] justify-between md:px-[108px] md:pt-[20px]">
      <Link to={"/"} className="flex flex-col items-center gap-2">
        <span className="logo   text-primary">Pawly</span>
        <img src="./Logo.svg" alt="Logo" />
      </Link>

      <div className="flex flex-row items-center gap-[100px]">
        <nav className="flex flex-row gap-8">
          <Link to="/clinics" className="btn-text">
            Clinics
          </Link>
          <Link to="/grooming" className="btn-text">
            Grooming
          </Link>
          <Link to="/shop" className="btn-text">
            Shop
          </Link>
        </nav>
        <div className="flex gap-4">
          <Button className=" btn-text border border-primary min-w-[130px] h-[50px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px] transition">
            Sign In
          </Button>{" "}
          <Button className=" btn-text border border-primary min-w-[130px] h-[50px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px] transition">
            Login
          </Button>{" "}
        </div>
      </div>
    </header>
  );
};
