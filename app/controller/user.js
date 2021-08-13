const service = require("../service/user");
const securePassword = require("../util/securePassword");

class UserDataController {
  register = async (req, res) => {
    const hashedPassword = await securePassword(req.body.password);
    const userData = {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: hashedPassword,
      confirmPassword: req.body.confirmPassword,
    };

    service.registerUser(userData, (error, data) => {
      if (error) {
        return res.status(409).json({
          success: false,
          message: "Duplicate Email Address Not Allowed",
          error,
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
