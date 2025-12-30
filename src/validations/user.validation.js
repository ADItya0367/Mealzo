import Joi from "joi";
import { Validation_Msg } from "../config/config.js";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(6)
    .max(50)
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  
  password: Joi.string()
    .min(6)
    .max(50)
    .required(),
});

export const forgotSchema = Joi.object({
  email: Joi.string().email().required(),
}); 

export const resetPasswordSchema = Joi.object({

  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&^#()_+=<>.,:;{}|-]).{6,20}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        Validation_Msg.PASSWORD_MUST,
    }),
});



export const addCustomerJoiSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": Validation_Msg.NAME_STRING,
      "string.empty": Validation_Msg.NAME_REQ,
      "string.min": Validation_Msg.NAME_ATLEAST,
      "string.max": Validation_Msg.NAME_MAXLENGHT,
      "any.required": Validation_Msg.NAME_REQ,
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": Validation_Msg.EMAIL_VALID,
      "string.empty": Validation_Msg.EMAIL_REQ,
      "any.required": Validation_Msg.EMAIL_REQ,
    }),

  role: Joi.string()
    .valid("customer", "admin", "staff")
    .required()
    .messages({
      "any.only": Validation_Msg.VALID_ROLE,
      "string.empty": Validation_Msg.ROLE_REQ,
      "any.required": Validation_Msg.ROLE_REQ,
    }),
});



export const addProductSchema = Joi.object({
  productName: Joi.string()
    .trim()
    .min(2)
    .max(40)
    .required()
    .messages({
      "string.empty": Validation_Msg.PROD_NAME_REQ,
      "string.min": Validation_Msg.PROD_ATLEAST,
      "string.max": Validation_Msg.PROD_MAXLENGTH,
    }),

  sku: Joi.string()
    .trim()
    .alphanum()
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": Validation_Msg.SKU_REQ,
      "string.alphanum": Validation_Msg.SKU_MUST,
      "string.min": Validation_Msg.SKU_ATLEAST,
      "string.max": Validation_Msg.SKU_MAXLENGTH,
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": Validation_Msg.PRICE_NUMBER,
      "number.positive": Validation_Msg.PRICE_POSITIVE,
      "any.required": Validation_Msg.PRICE_REQ,
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": Validation_Msg.STOCK_NUMBER,
      "number.integer": Validation_Msg.STOCK_INT,
      "number.min": Validation_Msg.STOCK_NOT_NEG,
      "any.required": Validation_Msg.STOCK_REQ,
    }),
});