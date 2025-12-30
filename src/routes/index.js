import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import produtRoutes from "./product.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", produtRoutes);

export default router;
