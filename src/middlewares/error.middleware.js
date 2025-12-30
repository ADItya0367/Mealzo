import { Codes, Constants } from "../config/config.js";

const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || Codes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || Constants.INTERNAL_SERVER_ERROR,
    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
};

export default errorHandler;
