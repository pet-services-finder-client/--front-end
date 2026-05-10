import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { RegisterForm } from "../RegisterForm";
import { LoginForm } from "../LoginForm";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { logout } from "@/features/authSlice";
import { Menu, Search, X } from "lucide-react";
import { Input } from "../ui/input";

type ModalType = "login" | "register" | null;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [modal, setModal] = useState<ModalType>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <>
      <header className="flex items-center justify-between w-full py-4 md:h-[91px] px-4 md:px-[108px] md:pt-[20px] ">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center gap-2">
          <span className="logo text-primary">Pawly</span>
          <img src="./Logo.svg" alt="Logo" className="w-10 md:w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row items-center gap-8">
          <div className="flex items-center gap-3">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                searchOpen
                  ? "w-[200px] opacity-100"
                  : "w-0 opacity-0 px-0 border-0"
              }`}
              onBlur={() => setSearchOpen(false)}
            />

            <Search
              className="cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            />

            {user && (
              <Link to="/profile">
                <img src="./icons/profile.svg" alt="profile" />
              </Link>
            )}
          </div>

          <nav className="flex gap-8">
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
                onClick={handleLogOut}
                className="btn-text border border-primary min-w-[130px] h-[50px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px]"
              >
                Log Out
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setModal("register")}
                  className="btn-text border border-primary min-w-[130px] h-[50px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px]"
                >
                  Sign In
                </Button>

                <Button
                  onClick={() => setModal("login")}
                  className="btn-text border border-primary min-w-[130px] h-[50px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px]"
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <Search
            className="cursor-pointer"
            onClick={() => setSearchOpen(!searchOpen)}
          />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="px-4 py-2 md:hidden">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="w-full"
            onBlur={() => setSearchOpen(false)}
          />
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 py-4 border-b bg-white">
          <nav className="flex flex-col gap-3">
            <Link to="/clinics" onClick={() => setMobileMenuOpen(false)}>
              Clinics
            </Link>

            <Link to="/grooming" onClick={() => setMobileMenuOpen(false)}>
              Grooming
            </Link>

            <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </Link>

            {user && (
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
            )}
          </nav>

          <div className="flex flex-col gap-3">
            {user ? (
              <Button onClick={handleLogOut}>Log Out</Button>
            ) : (
              <>
                <Button onClick={() => setModal("register")}>Sign In</Button>
                <Button onClick={() => setModal("login")}>Login</Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
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
