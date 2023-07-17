const express = require("express");
const userController = require("../Controllers/user.controller");
const Auth = require("../middleware/AuthMiddleware");
const userRoutes = express.Router();

userRoutes.route("/login").post(userController.loginController);
userRoutes.route("/register").post(userController.signupController);
userRoutes.route("/logout").get(userController.logoutController);

userRoutes.route("/me").get(Auth.authentication, userController.getUserMe);
userRoutes
  .route("/doctor-apply")
  .post(Auth.authentication, userController.applyDoctorController);
userRoutes
  .route("/change-notification-read")
  .put(Auth.authentication, userController.changeNotiToReadnotiController);

userRoutes
  .route("/delete-notifcation")
  .delete(Auth.authentication, userController.DeleteNotificationController);

userRoutes.route("/doctors").get(userController.GetAllDoctors);
userRoutes
  .route("/doctors/:doctorID")
  .get(userController.SingleDoctorDetailController);

// appointments
userRoutes
  .route("/booking")
  .post(Auth.authentication, userController.BookAppointment);

userRoutes
  .route("/appoints-available")
  .post(Auth.authentication, userController.CheckAvailabeController);

userRoutes
  .route("/myappointments")
  .get(Auth.authentication, userController.UserAppointmentsController);

module.exports = userRoutes;
