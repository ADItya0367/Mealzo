// src/routes/auth.routes.js

import express from "express";
import { register, login,forgot,resetPassword } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { forgotSchema, registerSchema, resetPasswordSchema } from "../validations/user.validation.js";
import { loginSchema } from "../validations/user.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/forgot", validate(forgotSchema), forgot);
router.post(
  "/reset-password",
  authMiddleware,              
  validate(resetPasswordSchema), 
  resetPassword                        
);


export default router;
