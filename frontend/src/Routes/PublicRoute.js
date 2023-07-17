import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location.pathname);

  return isAuthenticated !== true ? children : navigate("/");
};

export default PublicRoute;
