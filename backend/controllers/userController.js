const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config/config');

// Register Controller
const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body || {};

    // Validate fields
    if (!name || !phone || !email || !password || !role) {
      return next(createHttpError(400, "All fields are required!"));
    }

    // Check if user already exists
    const isUserPresent = await User.findOne({ email });

    if (isUserPresent) {
      return next(createHttpError(400, "User already exists!"));
    }

    
    // Save new user
    const newUser = new User({
      name,
      phone,
      email,
      password,
      role
    });


    await newUser.save();
    

    res.status(201).json({
      success: true,
      message: "New user created!",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt || new Date()
      }
    });
  } catch (error) {    
    next(error);
  }
};

// Login Controller
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    // Validate input
    if (!email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    const isUserPresent = await User.findOne({ email });
    if (!isUserPresent) {
      return next(createHttpError(401, "Invalid credentials"));
    }

    const isMatch = await bcrypt.compare(password, isUserPresent.password);

    if (!isMatch) {
      return next(createHttpError(401, "Invalid credentials"));
    }


    // Generate token
    const accessToken = jwt.sign(
      { _id: isUserPresent._id },
      config.accessTokenSecret,
      { expiresIn: "1d" }
    );

    // Set access token cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: "none",
      secure: true
    });

    res.status(200).json({
      success: true,
      message: "User login successfully!",
      data: {
        id: isUserPresent._id,
        name: isUserPresent.name,
        email: isUserPresent.email,
        role: isUserPresent.role
      }
    });
  } catch (error) {
    next(error);
  }
};

const getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken' , {
      httpOnly: true,
      sameSite: "none",
      secure: true
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { register, login , getUserData , logout};