import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth"; // Fix the casing of the import statement

const PrivateRoute = ({ children }) => {
  const loggedIn = useAuthStore((state) => state.isLoggedIn)();
  return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
