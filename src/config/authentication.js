import { Navigate, useLocation } from "react-router-dom";
import { useAuthProvider } from "contexts";

export function RequireAuth({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useAuthProvider();
  console.log(location, "indout ");
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/user/login" state={{ from: location }} replace />
  );
}
