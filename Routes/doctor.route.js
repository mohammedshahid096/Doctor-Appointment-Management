const express = require("express");
const Auth = require("../middleware/AuthMiddleware");
const doctorController = require("../Controllers/doctor.controller");
const doctorRoutes = express.Router();

doctorRoutes
  .route("/me")
  .get(
    Auth.authentication,
    Auth.DoctorAuthorization,
    doctorController.doctorProfileController
  )
  .put(
    Auth.authentication,
    Auth.DoctorAuthorization,
    doctorController.UpdateDoctorProfileController
  );
doctorRoutes
  .route("/appointments")
  .get(
    Auth.authentication,
    Auth.DoctorAuthorization,
    doctorController.DoctorAppointmentsController
  );
doctorRoutes
  .route("/appointments/:doctorID")
  .put(
    Auth.authentication,
    Auth.DoctorAuthorization,
    doctorController.DoctorAppointmentsStatusController
  );
module.exports = doctorRoutes;
