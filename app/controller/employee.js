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
        return res.status(400).json({
          success: false,
          message: "Error Occured",
          error,
        });
      } else {
        return res.status(201).json({
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

  getEmployeeById = (req, res) => {
    const employeeId = req.params.employeeId;
    service.employeeById(employeeId, (error, Data) => {
      if (error) {
        return res.status(400).send({
          success: false,
          message: 'Record not found'
        });
      } else {
        return res.status(200).send({
          success: true,
          message: 'Record found successfully',
          data: Data
        });
      }
    });
  }

  updateEmployeeDetail = (req, res) => {
    try {
      const employeeId = req.params.employeeId;
      const updatedEmployeeData = {
        name: req.body.name,
        gender: req.body.gender,
        department: req.body.department,
        salary: req.body.salary,
        startDate: req.body.startDate,
        note: req.body.note,
      };

      service.updateEmployeeDetails(employeeId, updatedEmployeeData);

      return res.status(200).send({
        success: true,
        message: 'Employee record updated successfully',
        data: updatedEmployeeData
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error found'
      });
    }
  }

   deleteEmployeeById = (req, res) => {
    try {
      const employeeId = req.params.employeeId;
      service.deleteEmployeeById(employeeId, (error, employeeData) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Please check for valid employee id'
          });
        } else {
          return res.status(200).send({
            success: true,
            message: 'Employee Deleted Successfully',
            data: employeeData
          });
        }
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Internal server error found'
      });
    }
  }
}

module.exports = new EmployeeController();
