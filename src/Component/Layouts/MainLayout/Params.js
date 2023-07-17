import { FaHome, FaUser, FaList } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";

export const UsersParams = () => {
  const routes = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
    },

    {
      path: "/appointments",
      name: "Appointments",
      icon: <FaList />,
    },
    {
      path: "/apply-doctor",
      name: "Apply Doctors",
      icon: <FaUserDoctor />,
    },
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUser />,
    },
    {
      path: "/notification",
      name: "Notifications",
      icon: <IoMdNotifications />,
    },
  ];
  return routes;
};

export const DoctorParams = () => {
  const routes = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaHome />,
    },

    {
      path: "/doctor/appointments",
      name: "Appointments",
      icon: <FaList />,
    },
    {
      path: "/doctor/profile",
      name: "Profile",
      icon: <FaUser />,
    },
    {
      path: "/notification",
      name: "Notifications",
      icon: <IoMdNotifications />,
    },
  ];
  return routes;
};
export const AdminParams = () => {
  const routes = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaHome />,
    },

    {
      path: "/admin/doctors",
      name: "Doctors",
      icon: <FaUserDoctor />,
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: <FaUser />,
    },
    {
      path: "/notification",
      name: "Notifications",
      icon: <IoMdNotifications />,
    },
  ];
  return routes;
};
