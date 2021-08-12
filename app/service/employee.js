const model = require("../models/employee.model.js");

class EmployeeService {
  registerEmployee = (employeeData, saveEmployeeData) => {
    model.createDetails(employeeData, (err, data) => {
      if (err) {
        saveEmployeeData(err, null);
      } else {
        saveEmployeeData(err, data);
      }
    });
  };

  employeeLogin = (loginDetails, authenticateEmployee) => {
    model.loginEmployee(loginDetails, (err, data) => {
      if (err) {
        authenticateEmployee(err, null);
      } else {
        authenticateEmployee(null, data);
      }
    });
  };
}

module.exports = new EmployeeService();
