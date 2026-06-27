import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute: React.FC = () => {
  const { user, authChecked } = useAppSelector((state) => state.auth);

  if (!authChecked) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
