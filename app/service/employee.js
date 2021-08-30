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
}

module.exports = new EmployeeService();
