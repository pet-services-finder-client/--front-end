import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import App from "./App.tsx";
import { HomePage } from "./pages/HomePage/HomePage.tsx";
import { ClinicsPage } from "./pages/ClinicsPage/ClinicsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="clinics" element={<ClinicsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
