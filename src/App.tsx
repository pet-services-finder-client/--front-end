import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./app/store";
import { useEffect } from "react";
import { getMeThunk, setAuthChecked } from "./features/authSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMeThunk());
    } else {
      dispatch(setAuthChecked());
    }
  }, [dispatch]);
  return (
    <div className=" theme flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full  px-4 md:px-[108px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
