import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import type React from "react";
import { useAppSelector } from "@/app/hooks";
import type { ModalType } from "./Header";

interface Props {
  openMenu: (value: boolean) => void;
  setSearchOpen: (value: boolean) => void;
  handleLogOut: () => void;
  setModal: (value: ModalType) => void;
}
export const Menu: React.FC<Props> = ({
  openMenu,
  setSearchOpen,
  handleLogOut,
  setModal,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="md:hidden fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10">
      <button
        type="button"
        className="absolute top-5 right-5 text-gray-500"
        onClick={() => openMenu(false)}
        aria-label="Close menu"
      >
        <X size={24} />
      </button>

      <nav className="flex flex-col items-center gap-6 text-base">
        <Link
          to="/clinics"
          className="btn-text"
          onClick={() => openMenu(false)}
        >
          Clinics
        </Link>
        <Link
          to="/grooming"
          className="btn-text"
          onClick={() => openMenu(false)}
        >
          Grooming
        </Link>
        <Link to="/shop" className="btn-text" onClick={() => openMenu(false)}>
          Shop
        </Link>
        {user && (
          <Link
            to="/profile"
            className="btn-text"
            onClick={() => openMenu(false)}
          >
            Profile
          </Link>
        )}
      </nav>

      <Search
        className="cursor-pointer text-gray-500"
        onClick={() => {
          setSearchOpen(true);
          openMenu(false);
        }}
      />

      <div className="flex flex-col items-center gap-3 w-[180px]">
        {user ? (
          <Button
            onClick={handleLogOut}
            className="border border-primary w-full h-[42px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px]"
          >
            Log Out
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                setModal("register");
                openMenu(false);
              }}
              className="border border-primary w-full h-[42px] text-white bg-primary hover:bg-transparent hover:text-primary rounded-[34px]"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                setModal("login");
                openMenu(false);
              }}
              className="border border-primary w-full h-[42px] bg-transparent text-primary hover:bg-primary hover:text-white rounded-[34px]"
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
