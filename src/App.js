import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import WebFont from "webfontloader";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Component/Layouts/Login Folder/Login";
import Signup from "./Component/Layouts/Login Folder/Signup";
import { LoadUserAction } from "./Actions/UserAction";
import Home from "./Component/Layouts/Home/Home";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
import ApplyDoctor from "./Component/Layouts/ApplyDoctor/ApplyDoctor";
import Notification from "./Component/Layouts/Notification/Notification";
import AllUsers from "./Component/Admin/AllUsers";
import AllDoctors from "./Component/Admin/AllDoctors";
import DoctorProfile from "./Component/Doctor/DoctorProfile";
import Booking from "./Component/Layouts/Booking/Booking";
import Appointments from "./Component/Layouts/Appointments/Appointments";
import DrAppointments from "./Component/Doctor/DrAppointments";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
    dispatch(LoadUserAction());
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookingappointment/:doctorID"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute>
                <AllDoctors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute>
                <DoctorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute>
                <DrAppointments />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={"no route"} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
