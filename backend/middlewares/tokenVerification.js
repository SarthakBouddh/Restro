const createHttpError = require("http-errors");
const config = require("../config/config");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next(createHttpError(401, "Please provide token!"));
    }

    const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

    const user = await User.findById(decodeToken._id);
    if (!user) {
      return next(createHttpError(401, "User does not exist!"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(createHttpError(401, "Invalid token!"));
  }
};

module.exports = { isVerifiedUser };
