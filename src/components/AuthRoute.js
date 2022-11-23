import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const AuthRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <h1 className="text-center text-4xl font-bold">Loading...</h1>;
  }

  return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;
