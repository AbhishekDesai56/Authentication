const service = require("../service/employee");
const logger = require('logger').createLogger('logger/development.log');

class EmployeeController {
  
  saveEmployee =  (req, res) => {
    const employeeData = {
      name: req.body.name,
      gender: req.body.gender,
      department: req.body.department,
      salary: req.body.salary,
      startDate: req.body.startDate,
      note: req.body.note,
    };
    
    return new Promise((resolve, reject) => {
      service.saveEmployee(employeeData, (error, data) => {
        if (error) {
        logger.error("400 - Error Occured");
        return reject(
          res.status(400).json({
           success: false,
           message: "Error Occured",
           error
         }));
        }
        resolve(res.status(201).json({
           success: true,
           message: "Employee Data has been save successfully",
         }));
      });
    });
    // service.saveEmployee(employeeData, (error, data) => {
    //   if (error) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Error Occured",
    //       error,
    //     });
    //   } else {
    //     return res.status(201).json({
    //       success: true,
    //       message: "Employee Data has been save successfully",
    //     });
    //   }
    // });
  }

  getAllEmployee = (req, res) => {
      try {
        service.getAllEmployee((error, employeeData) => {
          if (error) {
            logger.error("400 - Error Occured getAllEmployee");
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
        logger.error(`500 - ${error.message}`);
        return res.send(500).send({
          success: false,
          message: error.message
        });
      }
  }

  getEmployeeById = (req, res) => {
    const employeeId = req.params.employeeId;
    service.employeeById(employeeId, (error, data) => {
      if (error) {
        logger.error("400 - Record not found in getEmployeeById");
        return res.status(400).send({
          success: false,
          message: 'Record not found'
        });
      } else {
        return res.status(200).send({
          success: true,
          message: 'Record found successfully',
          data: data
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

      service.updateEmployeeDetails(employeeId,updatedEmployeeData, (error,data) => {
         if (error) {
          logger.error('400 - Please check for valid employee id in updateEmployeeDetail');
          return res.status(400).send({
            success: false,
            message: 'Please check for valid employee id'
          });
        } else {
           return res.status(200).send({
            success: true,
            message: 'Employee record updated successfully',
          });
        } 
      });
    } catch (err) {
      logger.error('500 - Internal server error found');
      res.status(500).send({
        success: false,
        message: 'Internal server error found'
      });
    }
  }

   deleteEmployeeById = (req, res) => {
    try {
      const employeeId = req.params.employeeId;
      service.deleteEmployeeById(employeeId, (error, data) => {
        if (error) {
          logger.error('400 - Please check for valid employee id in deleteEmployeeById');
          return res.status(400).send({
            success: false,
            message: 'Please check for valid employee id'
          });
        } else {
          return res.status(204).send({
            success: true,
            message: 'Employee Deleted Successfully',
          });
        }
      });
    } catch (error) {
      logger.error('500 - Internal server error found in deleteEmployeeById');
      return res.status(500).send({
        success: false,
        message: 'Internal server error found'
      });
    }
  }
}

module.exports = new EmployeeController();
