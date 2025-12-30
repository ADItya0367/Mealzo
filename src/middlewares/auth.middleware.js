// src/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { Codes, Constants } from "../config/config.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "").trim();


    if (!token) {
      const error = new Error(Constants.TOKEN_MISSING);
      error.statusCode = Codes.UNAUTHORIZED;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      const error = new Error(Constants.USER_NOTFOUND);
      error.statusCode = Codes.NOT_FOUND;
      throw error;
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
