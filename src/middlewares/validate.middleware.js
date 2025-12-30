import { Codes, Constants } from "../config/config.js";

const validate = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false,     
    allowUnknown: false, 
    stripUnknown: true,  
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    return res.status(Codes.BAD_REQUEST).json({
      success: false,
      message: Constants.VALIDATION_FAILED,
      errors: error.details.map((err) => err.message),
    });
  }

  req.body = value; 
  next();
};

export default validate;
