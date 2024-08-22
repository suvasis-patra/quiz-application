import SideBar from "../components/SideBar";
import { useAuth } from "../hooks/userAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type ProtectedRouteProps = { requiredRole?: "user" | "admin" };

const ProtectedRouteProvider = ({ requiredRole }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();
  return !user ? (
    <Navigate to="/auth/login" {...{ state: location }} replace />
  ) : (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default ProtectedRouteProvider;
