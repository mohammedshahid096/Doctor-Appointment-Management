const express = require("express");
const indexRoutes = express.Router();
const userRoutes = require("./user.route");
const adminRoutes = require("./admin.route");
const doctorRoutes = require("./doctor.route");

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/admin", adminRoutes);
indexRoutes.use("/doctor", doctorRoutes);

module.exports = indexRoutes;
