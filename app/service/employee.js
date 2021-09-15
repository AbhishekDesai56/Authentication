const model = require("../models/employee");

class EmployeeService {
  saveEmployee = (employeeData, saveEmployeeData) => {
    model.saveEmployee(employeeData, (err, data) => {
      if (err) {
        saveEmployeeData(err, null);
      } else {
        saveEmployeeData(err, data);
      }
    });
  };

  getAllEmployee = (getEmployees) => {
    model.getAllEmployee((error, data) => {
      return error ? getEmployees(error, null) : getEmployees(null, data);
    });
  }

  employeeById = (employeeId, retrieveEmployeeById) => {
    model.employeeById(employeeId, (error, data) => {
      return error ? retrieveEmployeeById(error, null) : retrieveEmployeeById(null, data);
    });
  }

  updateEmployeeDetails = (employeeId, employeeData, updateEmployee) => {
    model.updateEmployeeDetails(employeeId, employeeData, (err, data) => {
      return err ? updateEmployee(err, null) : updateEmployee(null, data);
    });
  }

  deleteEmployeeById = (employeeId, deleteEmployeeById) => {
    try {
      model.deleteEmployeeById(employeeId, (error, data) => {
        return error ? deleteEmployeeById(error, null) : deleteEmployeeById(null, data);
      });
    } catch (error) {
      return deleteEmployeeById(error, null);
    }
  }
}


module.exports = new EmployeeService();
