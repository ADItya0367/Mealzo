
import { Codes, Constants } from "../config/config.js";
import * as productService from "../services/product.service.js"
export const addProduct = async (req, res, next) => {
  try {
    const result = await productService.addProduct(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.PRODUCT_ADD,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.PRODUCT_DELETE,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const getProduct = async (req, res, next) => {
  try {
    const result = await productService.getProduct(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.PRODUCT_DATA_FETCHED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const result = await productService.getProductById(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.PRODUCT_DATA_FETCHED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const updateProduct = async (req, res, next) => {
  try {
    const result = await productService.updateProduct(req.body);

    return res.status(Codes.CREATED).json({
      success: true,
      message: Constants.PRODUCT_UPDATE,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};