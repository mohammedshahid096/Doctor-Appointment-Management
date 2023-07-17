const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const userModel = require("../SchemaModels/user.model");
const doctorModel = require("../SchemaModels/doctor.model");

// TODO :for authentication
module.exports.authentication = async (req, res, next) => {
  try {
    const { DpToken } = req.cookies;
    if (!req.headers["authorization"]) {
      return next(createError.Unauthorized("Authorization Header Error"));
    }
    const AuthToken = req.headers["authorization"].split(" ")[1];

    if (AuthToken !== DpToken) {
      return next(createError.Unauthorized("Authorization is not matching"));
    }

    const decodetoken = jwt.verify(DpToken, process.env.JWT_SECRET_KEY);
    if (!decodetoken) {
      return next(createError.NetworkAuthenticationRequire("check the token"));
    }
    req.user = decodetoken.user;
    next();
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : for Admin Authorization
module.exports.AdminAuthorization = async (req, res, next) => {
  try {
    const isExist = await userModel.findById(req.user);
    if (!isExist) {
      return next(createError.BadRequest("User not Exist"));
    }
    if (isExist.isAdmin === false) {
      return next(createError(403, `you can't use this resources`));
    }
    req.Adminuser = isExist._id;
    next();
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

// TODO : for doctor Authorization
module.exports.DoctorAuthorization = async (req, res, next) => {
  try {
    const isExist = await userModel.findById(req.user);
    if (!isExist) {
      return next(createError.BadRequest("User not Exist"));
    }
    if (isExist.isDoctor === false) {
      return next(createError(403, `you can't use this resources`));
    }
    const DoctorData = await doctorModel.findOne({ userId: isExist._id });
    req.Doctoruser = isExist._id;
    req.DoctorId = DoctorData._id;
    next();
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};
