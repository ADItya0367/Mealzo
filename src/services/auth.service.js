// src/services/auth.service.js

import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendMail } from "../utils/mailer.js";
import { Codes, Constants } from "../config/config.js";

export const register = async (data) => {
  const { name, email, password } = data;

  const existing = await User.findOne({ where: { email } });

  if (existing) {
    const error = new Error(Constants.EMAILREGISTERED);
    error.statusCode = Codes.BAD_REQUEST;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return { id: user._id, name: user.name, email: user.email };
};

export const login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error(Constants.USER_NOTFOUND);
    error.statusCode = Codes.NOT_FOUND;
    throw error;
  }

  console.log(user);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error(Constants.INVALID_PASSWORD);
    error.statusCode = Codes.UNAUTHORIZED;
    throw error;
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, isAdmin:user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user: { id: user._id, name: user.name, email: user.email,isAdmin:user.isAdmin } };
};



export const forgot = async (data) => { 
  const { email } = data;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error(Constants.USER_NOTFOUND);
    error.statusCode = Codes.NOT_FOUND;
    throw error;
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword?token=${token}`; 

//  await sendMail(
//   email,
//   "Forgot password verification",
//   `
//     <h1>Hello!</h1>
//     <p>Password reset link is:</p>
//     <p>
//       <a href="${resetUrl}" style="color: blue; text-decoration: underline;" target="_blank">
//         Click here to reset password
//       </a>
//     </p>
//     <p>Or copy this URL:</p>
//     <p>${resetUrl}</p>
//   `
// );

  return { resetUrl, user: { id: user._id, name: user.name, email: user.email } };
};


export const resetPassword = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error(Constants.USER_NOTFOUND);
    error.statusCode = Codes.NOT_FOUND;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await user.update({ password: hashedPassword });

  return {
    success: true,
    message: Constants.RESET_SUCCESS,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};
