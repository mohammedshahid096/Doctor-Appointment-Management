import { NavLink, useNavigate, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Layout.css";
import { AdminParams, DoctorParams, UsersParams } from "./Params";
import { useSelector, useDispatch } from "react-redux";
import { FaRightFromBracket } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { LogoutAction } from "../../../Actions/UserAction";
import Badge from "@mui/material/Badge";

const LayoutDesign = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const routes =
    user && user.isAdmin
      ? AdminParams()
      : user.isDoctor
      ? DoctorParams()
      : UsersParams();

  const LogoutFunction = () => {
    dispatch(LogoutAction());
    navigate("/login");
  };
  const mainStyle = {
    width: isOpen ? "calc(100% - 200px)" : "calc(100% - 45px)",
  };
  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Docter App Mng
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
            {/* loogout */}
            <NavLink
              to={"/login"}
              key={"logout"}
              className="link"
              activeClassName="active"
              onClick={LogoutFunction}
            >
              <div className="icon">{<FaRightFromBracket />}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    {"Logout"}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          </section>
        </motion.div>

        <main style={mainStyle}>
          <div className="notificationDiv">
            <Badge
              badgeContent={user && user.notification.length}
              color="error"
              onClick={() => navigate("/notification")}
            >
              <IoMdNotifications color="action" />
            </Badge>
            <Link to="/profile">{user && user.name}</Link>
          </div>
          {children}
        </main>
      </div>
    </>
  );
};

export default LayoutDesign;
