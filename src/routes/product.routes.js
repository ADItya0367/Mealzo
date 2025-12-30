// src/routes/user.routes.js

import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addProductSchema} from "../validations/user.validation.js";
import validate from "../middlewares/validate.middleware.js";
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();


router.post("/add-product", validate(addProductSchema),authMiddleware,addProduct);
router.post("/delete-product",authMiddleware,deleteProduct);
router.get("/get-products",authMiddleware,getProduct);
router.post("/get-product",authMiddleware,getProductById);
router.put("/update-product",authMiddleware,updateProduct);

export default router;
