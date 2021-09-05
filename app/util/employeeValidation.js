const joi = require("joi");

const validation = joi.object({
  name: joi.string().pattern(new RegExp("^[A-Z]{1}[a-z]{2,}$")).required(),
  gender: joi.any().valid("Male", "Female"),
  department: joi.array().items(joi.string()),
  salary: joi.string().required(),
  startDate: joi.string().required(),
});

const employeeValidation = (req, res, next) => {
  const empData = {
    name: req.body.name,
    gender: req.body.gender,
    department: req.body.department,
    salary: req.body.salary,
    startDate: req.body.startDate,
  };

  const { error } = validation.validate(empData);
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

module.exports = employeeValidation;
