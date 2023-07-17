const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = async (userId) => {
  const payload = {
    user: userId,
  };
  const options = {
    expiresIn: process.env.JWT_EXPIRES,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
  return token;
};

const passwordVerify = async (password, hashPassword) => {
  const ispasswordmatch = await bcrypt.compare(password, hashPassword);
  if (!ispasswordmatch) {
    return false;
  }
  return true;
};

const createCookie = async (user, statuscode, res) => {
  user.password = undefined;
  const token = await createToken(user._id);

  let date = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const options = {
    expires: date,
    sameSite: "lax",
    secure: false,
  };

  // TODO : cookies are set and sended to server
  res.cookie("DpToken", token, options).status(statuscode).json({
    success: true,
    user,
    token,
  });
};
module.exports.passwordVerify = passwordVerify;
module.exports.createCookie = createCookie;
