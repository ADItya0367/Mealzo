// src/controllers/user.controller.js

import { Codes, Constants } from "../config/config.js";
import * as userService from "../services/user.service.js";
export const getProfile = async (req, res, next) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


export const addCustomer = async (req, res, next) => {
  try {
    const result = await userService.addCustomer(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.CUSTOMER_ADD,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (req, res, next) => {
  try {
    const result = await userService.getCustomer(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.CUSTOMER_DATA_FETCHED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const result = await userService.deleteCustomer(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.CUSTOMER_DELETED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const statusChange = async (req, res, next) => {
  try {
    const result = await userService.statusChange(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.STATUS_CHANGED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const getCustomerByID = async (req, res, next) => {
  try {
    const result = await userService.getCustomerById(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.CUSTOMER_DATA_FETCHED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const result = await userService.updateCustomer(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.CUSTOMER_UPDATED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

