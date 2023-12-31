import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return isAuthenticated === true ? children : navigate("/login");
};

export default ProtectedRoute;
