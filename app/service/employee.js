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
}

module.exports = new EmployeeService();
