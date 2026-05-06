import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { RegisterForm } from "../RegisterForm";
import { LoginForm } from "../LoginForm";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { logout } from "@/features/authSlice";
type ModalType = "login" | "register" | null;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [modal, setModal] = useState<ModalType>(null);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
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
            {user ? (
              <Button
                onClick={() => handleLogOut()}
                className=" btn-text border border-primary min-w-[130px] h-[50px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px] transition"
              >
                Log Out
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setModal("register")}
                  className=" btn-text border border-primary min-w-[130px] h-[50px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px] transition"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setModal("login")}
                  className=" btn-text border border-primary min-w-[130px] h-[50px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px] transition"
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {modal === "register" && (
            <RegisterForm
              onClose={() => setModal(null)}
              onSwitchModal={() => setModal("login")}
            />
          )}
          {modal === "login" && (
            <LoginForm
              onClose={() => setModal(null)}
              onSwitchModal={() => setModal("register")}
            />
          )}
        </div>
      )}
    </>
  );
};
