const service = require("../service/user");

class EmployeeController {
  saveEmployee = (req, res) => {
    const employeeData = {
      name: req.body.name,
      gender: req.body.gender,
      department: req.body.department,
      salary: req.body.salary,
      startDate: req.body.startDate,
      note: req.body.note,
    };

    service.saveEmployee(saveEmployee, (error, data) => {
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
  };
}
