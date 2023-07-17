const createError = require("http-errors");
const userModel = require("../SchemaModels/user.model");
const doctorModel = require("../SchemaModels/doctor.model");

// TODO : getting all the users
module.exports.GetAllUserController = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: true,
      users,
      total_users: users.length,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : getting all the doctors
module.exports.GetAllDoctorController = async (req, res, next) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json({
      message: true,
      doctors,
      total_doctors: doctors.length,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : Approving for the doctor
module.exports.ChangeAccountStatusController = async (req, res, next) => {
  try {
    const { DoctorID, DoctorStatus } = req.body;

    const doctor = await doctorModel.findByIdAndUpdate(DoctorID, {
      status: DoctorStatus,
    });

    // console.log(doctor);
    if (!doctor) {
      next(createError.BadRequest("Dcotor not exist"));
    }

    // if the data will be in new Object("kkkkk") to convert we use toHexString()
    // const x = doctor.userId.toHexString();
    const user = await userModel.findById(doctor.userId);
    // were are going to use opposit bcz in findbyupdate function it will return
    // previous data then it will update in the database

    DoctorStatus !== "pending"
      ? (user.isDoctor = true)
      : (user.isDoctor = false);
    let type;
    let message;
    if (DoctorStatus !== "pending") {
      type = "Doctor-Account-Request-Updated";
      message = "Your Doctor Account Request was Approved ";
    } else {
      type = "Doctor Account is : -----------";
      message = "Your Doctor Account Request was -------";
    }
    user.notification.unshift({
      type,
      message,
      onClickPath: "/notification",
    });
    await user.save();
    res.status(200).json({
      sucess: true,
      message: "successfully account is updated to : " + DoctorStatus,
    });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
