const express = require("express");
const Auth = require("../middleware/AuthMiddleware");
const adminController = require("../Controllers/admin.controller");
const adminRoutes = express.Router();

adminRoutes
  .route("/users")
  .get(
    Auth.authentication,
    Auth.AdminAuthorization,
    adminController.GetAllUserController
  );
adminRoutes
  .route("/doctors")
  .get(
    Auth.authentication,
    Auth.AdminAuthorization,
    adminController.GetAllDoctorController
  );
adminRoutes
  .route("/changeaccoutstatus")
  .put(
    Auth.authentication,
    Auth.AdminAuthorization,
    adminController.ChangeAccountStatusController
  );

module.exports = adminRoutes;
