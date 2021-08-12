const service = require("../service/employee.js");

class EmployeeDataController {
  register = (req, res) => {
    const employeeData = {
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    service.registerEmployee(employeeData, (error, data) => {
      if (error) {
        return res.status(409).json({
          success: false,
          message: "Duplicate Email Address Not Allowed",
          data,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Emoloyee has been successfully register",
        });
      }
    });
  };

  login = (req, res) => {
    const loginDetails = {
      email: req.body.email,
      password: req.body.password,
    };

    service.employeeLogin(loginDetails, (error, data) => {
      if (error) {
        return res.status(500).json({ success: false, message: error, data });
      } else {
        return res.status(200).json({
          success: true,
          message: "Employee logged in successfully",
          data,
        });
      }
    });
  };
}

module.exports = new EmployeeDataController();
