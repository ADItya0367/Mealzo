// src/controllers/auth.controller.js

import { Codes, Constants } from "../config/config.js";
import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.USER_REGISTERED_SUCCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    return res.status(Codes.SUCCESS).json({
      success: true,
      message: Constants.LOGIN_SUCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const forgot = async (req, res, next) => {
  try {
    const result = await authService.forgot(req.body);

    return res.status(Codes.SUCCESS).json({
      success: true,
      message: Constants.RESET_LINK_SEND,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  req.body.email = req.user.email;
  try {
    const result = await authService.resetPassword(req.body);

    return res.status(Codes.SUCCESS).json({
      success: true,
      message: Constants.RESET_SUCCESS,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

