import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/error.middleware.js";
import { Codes, Constants } from "./config/config.js";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use("/api", routes);

app.use((req, res) => {
  res.status(Codes.NOT_FOUND).json({
    success: false,
    message: Constants.ROUTE_NOT_FOUND,
  });
});

app.use(errorHandler);




export default app;