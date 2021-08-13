const joi = require("joi");

const validation = joi.object({
  fName: joi.string().required(),
  lName: joi.string().required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required().valid(joi.ref("password")),
});

const userValidation = (req, res, next) => {
  const payload = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { error } = validation.validate(payload);
  if (error) {
    return res.status(406).json({
      success: true,
      message: "Error in User Data",
      error,
    });
  } else {
    next();
  }
};

module.exports = userValidation;
