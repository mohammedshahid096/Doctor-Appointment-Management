const userModel = require("../SchemaModels/user.model");
const doctorModel = require("../SchemaModels/doctor.model");
const appointmentModel = require("../SchemaModels/appointments.model");
const createError = require("http-errors");
const Token_Verify = require("../Config/TokenGenerater");
const moment = require("moment");

// TODO : controller for  login  purpose
module.exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createError.BadRequest("Enter the required fields"));
    }

    const isExist = await userModel.findOne({ email }).select("+password");

    if (!isExist) {
      return next(createError.BadRequest("Email or Password is not match"));
    }

    const ispasswordmatch = await Token_Verify.passwordVerify(
      password,
      isExist.password
    );
    if (ispasswordmatch === false) {
      return next(createError.BadRequest("Email or Password is not match"));
    }

    Token_Verify.createCookie(isExist, 200, res);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : controller for  signup  purpose
module.exports.signupController = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return next(createError.BadRequest("Enter the required fields"));
    }

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return next(createError.BadRequest("Email Already exist"));
    }

    const create_user = new userModel({
      name,
      email,
      password,
    });

    await create_user.save();

    Token_Verify.createCookie(create_user, 201, res);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : logout option
module.exports.logoutController = (req, res, next) => {
  try {
    res.clearCookie("DpToken").status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : getting user Details
module.exports.getUserMe = async (req, res) => {
  const user = await userModel.findById(req.user);
  res.status(200).json({ success: true, user });
};

// TODO : Apply for the Doctor
module.exports.applyDoctorController = async (req, res, next) => {
  try {
    const timings = {
      start: req.body.start,
      end: req.body.end,
    };
    delete req.body.start;
    delete req.body.end;
    req.body.timings = timings;
    req.body.userId = req.user;

    const IsDoctorExist = await doctorModel.findOne({
      userId: req.body.userId,
    });

    if (IsDoctorExist) {
      return next(createError.BadRequest("Already Applied for the Doctor"));
    }

    const newDoctor = new doctorModel(req.body);
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    adminUser.notification.unshift({
      type: "Apply-for-Doctor-Request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} has applied for Doctor Account`,
      data: {
        docotorId: newDoctor._id,
        name: newDoctor.firstname + " " + newDoctor.lastname,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, {
      notification: adminUser.notification,
    });
    res.status(201).json({
      success: true,
      message: "Successfully Applied for Doctor Account",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : Change the all notification to seen notification
module.exports.changeNotiToReadnotiController = async (req, res, next) => {
  try {
    const userData = await userModel.findById(req.user);
    const seennotification = userData.notification;
    userData.notification = [];
    userData.seennotification.push(...seennotification);
    await userData.save();
    res.status(200).json({
      success: true,
      message: "successfully Readed the notification",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

module.exports.DeleteNotificationController = async (req, res, next) => {
  try {
    const userData = await userModel.findById(req.user);

    const whichNotifications = req.body.lists;
    whichNotifications.sort();

    for (let i = whichNotifications.length - 1; i >= 0; i--) {
      userData.seennotification.splice(whichNotifications[i], 1);
    }
    await userData.save();

    res.status(200).json({
      success: true,
      message: "successfully Deleted the notifications",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : single doctor details
module.exports.SingleDoctorDetailController = async (req, res, next) => {
  try {
    const doctorDetails = await doctorModel.findById(req.params.doctorID);
    if (!doctorDetails) {
      return next(createError.BadGateway("No Doctor Available"));
    }
    res.status(200).json({
      message: true,
      doctorDetails,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : all the doctors which approved those doctors will be shown
module.exports.GetAllDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).json({
      message: true,
      doctors,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : check wheather booking slot is available or not
module.exports.CheckAvailabeController = async (req, res, next) => {
  try {
    const date = moment(req.body.date, "YYYY-MM-DD").toISOString();

    const time = moment(req.body.time, "HH:mm").toISOString();

    // const currentDate = moment().toISOString();
    // console.log(currentDate);

    // const fromtime = moment(req.body.time, "HH:mm")
    //   .subtract(1, "hours")
    //   .toISOString();
    // const Totime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();

    const appointments = await appointmentModel.find({
      doctorId: req.body.doctorId,
      date: `${date}`,
      time: `${time}`,
    });
    // console.log(appointments);

    if (appointments.length > 0) {
      return next(
        createError.BadRequest("Appointments are not Available at this  time")
      );
    }

    res.status(200).json({
      success: true,
      message: "Appointments Available",
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : booking an appointment
module.exports.BookAppointment = async (req, res, next) => {
  try {
    const isDoctorExist = await doctorModel
      .findById(req.body.doctorId)
      .populate("userId", "name notification");

    if (!isDoctorExist) {
      return next(createError.BadRequest("Doctor not exist"));
    }

    const SaveData = {
      userId: req.user,
      doctorId: isDoctorExist._id,
      doctorName: `Dr.${isDoctorExist.firstname} ${isDoctorExist.lastname}`,
      userName: req.body.name,
      date: moment(req.body.date, "MM/DD/YYYY").toISOString(),
      time: moment(req.body.time, "HH:mm").toISOString(),
    };
    console.log(SaveData);

    const newAppointment = new appointmentModel(SaveData);
    await newAppointment.save();
    isDoctorExist.userId.notification.unshift({
      type: "New-Appointment-request",
      message: `A new Appointment Request from ${SaveData.userName}`,
      onClickPath: "/user/appointments",
    });

    await userModel.findByIdAndUpdate(isDoctorExist.userId, {
      notification: isDoctorExist.userId.notification,
    });
    res.status(200).json({
      message: true,
      message: `Appoint is Booked with ${SaveData.doctorName}`,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : user Appointments List
module.exports.UserAppointmentsController = async (req, res, next) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.user });
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
