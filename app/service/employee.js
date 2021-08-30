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
    model.employeeById(employeeId, (error, Data) => {
      return error ? retrieveEmployeeById(error, null) : retrieveEmployeeById(null, Data);
    });
  }

  updateEmployeeDetails = (employeeId, employeeData) => {
    try {
      return model.updateEmployeeDetails(employeeId, employeeData);
    } catch (error) {
      return error;
    }
  }
}

module.exports = new EmployeeService();
