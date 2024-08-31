import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/userAuth";

type ProtectedRouteProps = {
  allowedRoles?: Array<"user" | "admin">;
};

const ProtectedRouteProvider = ({
  allowedRoles = ["user"],
}: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteProvider;
