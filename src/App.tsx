import { Outlet } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className=" theme flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full  px-4 md:px-[108px] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
