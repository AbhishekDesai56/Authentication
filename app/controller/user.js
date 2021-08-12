const service = require("../service/employee.js");

class UserDataController {
  register = (req, res) => {
    const userData = {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    service.registerUser(userData, (error, data) => {
      if (error) {
        return res.status(409).json({
          success: false,
          message: "Duplicate Email Address Not Allowed",
          data,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "User has been successfully register",
        });
      }
    });
  };

  login = (req, res) => {
    const loginDetails = {
      email: req.body.email,
      password: req.body.password,
    };

    service.loginUser(loginDetails, (error, data) => {
      if (error) {
        return res.status(500).json({ success: false, message: error, data });
      } else {
        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          data,
        });
      }
    });
  };
}

module.exports = new UserDataController();
