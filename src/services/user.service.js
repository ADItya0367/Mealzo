// import User from "../models/User.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { sendMail } from "../utils/mailer.js";
import { Codes, Constants } from "../config/config.js";
import Customer from "../models/Customer.model.js";




export const deleteCustomer = async (data) => {
  const { id } = data;

  const customer = await Customer.findByPk(id);

  if (!customer) {
    const error = new Error(Constants.CUSTOMER_NOTFOUND);
    error.statusCode = Codes.NOT_FOUND;
    throw error;
  }

  await customer.destroy();

  return {
    success: true,
    message: Constants.CUSTOMER_DELETE,
    deletedId: id,
  };
};

export const addCustomer = async (data) => {
  const { name, email, role } = data;

  const existingCustomer = await Customer.findOne({ where: { email } });

  if (existingCustomer) {
    const error = new Error(Constants.CUSTOMER_EXIST);
    error.statusCode = Codes.BAD_REQUEST;
    throw error;
  }
  const customer = await Customer.create({
    name,
    email,
    role,
    status: "active",
  });

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    role: customer.role,
    status: customer.status,
  };
};


export const getCustomer = async () => {
  const customers = await Customer.findAll({
    order: [["createdAt", "DESC"]],
  });

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    role: customer.role,
    status: customer.status,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  }));
};


export const statusChange = async (data) => {
  const { id, status } = data;

  if (!id || !status) {
    const error = new Error(Constants.ID_STATUS_REQUIRED);
    error.statusCode = Codes.BAD_REQUEST;
    throw error;
  }
  const validStatuses = ["active", "inactive"];
  if (!validStatuses.includes(status)) {
    const error = new Error(Constants.INVALID_STATUS);
    error.statusCode = Codes.BAD_REQUEST;
    throw error;
  }

  const customer = await Customer.findByPk(id);
  if (!customer) {
    const error = new Error(Constants.CUSTOMER_NOTFOUND);
    error.statusCode = Codes.NOT_FOUND;
    throw error;
  }

  customer.status = status;
  await customer.save();

  return {
    message: Constants.STATUS_CHANGED,
    customer: {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      role: customer.role,
      status: customer.status,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    },
  };
};


export const getCustomerById = async (data) => {
  const { id } = data;

  if (!id || isNaN(id)) {
    const error = new Error(Constants.INVALID_CUSTOMER);
    error.statusCode = Codes.BAD_REQUEST;
    throw error;
  }

  const customer = await Customer.findByPk(id);

  if (!customer) {
    const error = new Error(Constants.CUSTOMER_NOTFOUND);
    error.statusCode = Codes.NOT_FOUND;
    throw error;
  }

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    role: customer.role,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  };
};

export const updateCustomer = async (data) => {
  try {
    const { customer_Id, name, email, role } = data;

    const customer = await Customer.findOne({ where: { id: customer_Id } });

    if (!customer) {
      const error = new Error(Constants.CUSTOMER_NOTFOUND);
      error.statusCode = Codes.NOT_FOUND;
      throw error;
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.role = role || customer.role;

    await customer.save();

    return {
      success: true,
      message: Constants.CUSTOMER_UPDATED,
      data: customer,
    };
  } catch (error) {
    throw error;
  }
};


