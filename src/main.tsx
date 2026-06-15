import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import App from "./App.tsx";
import { HomePage } from "./pages/HomePage/HomePage.tsx";
import { PetCreatePage } from "./pages/PetCreatePage/PetCreatePage.tsx";
import { UserPetProfilePage } from "./pages/UserPetProfilePage/UserPetProfilePage.tsx";
import { BusinessDetailsPage } from "./pages/BusinessDetailsPage/BusinessDetailsPage.tsx";
import { Catalog } from "./pages/Catalog/Catalog.tsx";
import { ResetPasswordPage } from "./pages/ResetPasswordPage/ResetPasswordPage.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path=":category" element={<Catalog />} />
          <Route path="petCreate" element={<PetCreatePage />} />
          <Route path="profile" element={<UserPetProfilePage />} />
          <Route path="businesses/:id" element={<BusinessDetailsPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
