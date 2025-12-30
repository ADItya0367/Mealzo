
import { Codes, Constants } from "../config/config.js";
import Product from "../models/Product.model.js";
export const addProduct = async (data) => {
  const { productName, sku, price, stock } = data;

  const existingProduct = await Product.findOne({ where: { sku } });

  if (existingProduct) {
    const error = new Error(Constants.PRODUCT_EXIST);
    error.statusCode = Codes.BAD_REQUEST;
    throw error;
  }

  const product = await Product.create({
    productName,
    sku,
    price,
    stock,
  });

  return {
    id: product.id,
    productName: product.productName,
    sku: product.sku,
    price: product.price,
    stock: product.stock,
  };
};

export const deleteProduct = async (data) => {
    const {id} = data;

  const product = await Product.findByPk(id);

  if (!product) {
    const error = new Error(Constants.PRODUCT_NOTFOUND);
    error.statusCode = Codes.NOT_FOUND;
    throw error;
  }
  await product.destroy();

  return {
    success: true,
    message: Constants.PRODUCT_DELETE,
    deletedId: id,
  };
};


export const getProduct = async () => {

  const products = await Product.findAll({
    order: [["createdAt", "DESC"]],
  });

  return products.map((product) => ({
    id: product.id,
    productName: product.productName,
    sku: product.sku,
    price: product.price,
    stock: product.stock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));
};

export const getProductById = async (data) => {
  const {id} = data

  
  if (!id || isNaN(id)) {
    const error = new Error(Constants.INVALID_PRODUCT);
    error.statusCode = Codes.BAD_REQUEST;
    throw error;
  }

  const product = await Product.findByPk(id);

  if (!product) {
    const error = new Error(Constants.PRODUCT_NOTFOUND);
    error.statusCode = Codes.NOT_FOUND;
    throw error;
  }

  return {
    id: product.id,
    productName: product.productName,
    sku: product.sku,
    price: product.price,
    stock: product.stock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export const updateProduct = async (data) => {
  try {
    const { product_Id, productName, sku, price, stock } = data;

    const product = await Product.findOne({ where: { id: product_Id } });

    if (!product) {
      const error = new Error(Constants.PRODUCT_NOTFOUND);
      error.statusCode = Codes.NOT_FOUND;
      throw error;
    }

    product.productName = productName || product.productName;
    product.sku = sku || product.sku;
    product.price = price || product.price;
    product.stock = stock || product.stock;

    await product.save();

    return {
      success: true,
      message: Constants.PRODUCT_UPDATE,
      data: product,
    };
  } catch (error) {
    throw error;
  }
};