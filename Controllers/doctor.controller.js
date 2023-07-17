const createError = require("http-errors");
const userModel = require("../SchemaModels/user.model");
const doctorModel = require("../SchemaModels/doctor.model");
const appointmentModel = require("../SchemaModels/appointments.model");

// TODO : doctor profile data
module.exports.doctorProfileController = async (req, res, next) => {
  try {
    const doctor = await doctorModel.findById(req.DoctorId);
    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : updating the doctor profile
module.exports.UpdateDoctorProfileController = async (req, res, next) => {
  try {
    const timings = {
      start: req.body.start,
      end: req.body.end,
    };
    delete req.body.start;
    delete req.body.end;
    req.body.timings = timings;
    await doctorModel.findByIdAndUpdate(req.DoctorId, req.body);
    res.status(200).json({
      success: true,
      message: "successfully updated the Doctor Profile",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : appointments of a doctor
module.exports.DoctorAppointmentsController = async (req, res, next) => {
  try {
    const appointments = await appointmentModel.find({
      doctorId: req.DoctorId,
    });
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : updating the appointment status
module.exports.DoctorAppointmentsStatusController = async (req, res, next) => {
  try {
    const appointments = await appointmentModel
      .findByIdAndUpdate(req.params.doctorID, { status: req.body.status })
      .populate("userId", "notification");

    let type;
    let message;
    if (appointments.status === "pending") {
      type = "Appointment-status-Approved";
      message = "Your Appointment is confirmed ";
    } else {
      type = "Appointment-status-Reject";
      message = "Your Appointment is Rejected, please create a new appointment";
    }
    appointments.userId.notification.unshift({
      type,
      message,
      onClickPath: "/doctor-appointments",
    });

    await userModel.findByIdAndUpdate(appointments.userId._id, {
      notification: appointments.userId.notification,
    });

    res.status(200).json({
      success: true,
      message: "successfully Updated",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
