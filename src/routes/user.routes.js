// src/routes/user.routes.js

import express from "express";
import { deleteCustomer, getCustomerByID, getProfile, statusChange, updateCustomer } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addCustomerJoiSchema , addProductSchema} from "../validations/user.validation.js";
import validate from "../middlewares/validate.middleware.js";
import { addCustomer,getCustomer } from "../controllers/user.controller.js";
import { addProduct } from "../controllers/product.controller.js";

const router = express.Router();
console.log("Hello Enteresd");

router.get("/profile", authMiddleware, getProfile);
router.post("/add-customer", validate(addCustomerJoiSchema),authMiddleware,addCustomer);
router.get("/get-customer",authMiddleware,getCustomer);
router.put("/status-change",authMiddleware,statusChange);
router.post("/add-product", validate(addProductSchema),authMiddleware,addProduct);
router.post("/delete-customer",authMiddleware,deleteCustomer);
router.post("/get-customerId",authMiddleware,getCustomerByID);
router.put("/update-customer",authMiddleware,updateCustomer);
export default router;
