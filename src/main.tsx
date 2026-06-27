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
import posthog from "posthog-js";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.tsx";

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST ?? "https://eu.i.posthog.com",
  person_profiles: "identified_only",
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path=":category" element={<Catalog />} />
          <Route element={<ProtectedRoute />}>
            <Route path="petCreate" element={<PetCreatePage />} />
            <Route path="profile" element={<UserPetProfilePage />} />
          </Route>
          <Route path="businesses/:id" element={<BusinessDetailsPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
