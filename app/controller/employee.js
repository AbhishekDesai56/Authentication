const service = require("../service/employee");

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

    service.saveEmployee(employeeData, (error, data) => {
      if (error) {
        return res.status(409).json({
          success: false,
          message: "Duplicate Email Address Not Allowed",
          error,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Employee Data has been save successfully",
        });
      }
    });
  }

    getAllEmployee = (req, res) => {
      try {
        service.getAllEmployee((error, employeeData) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: 'Error Occured'
            });
          }
          res.status(200).send({
            success: true,
            message: 'Fetch all Employees Details',
            data: employeeData
          });
        });
      } catch (error) {
        return res.send(500).send({
          success: false,
          message: error.message
        });
      }
  }
}

module.exports = new EmployeeController();
