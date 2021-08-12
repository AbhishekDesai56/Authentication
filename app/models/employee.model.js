const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const employeeDbData = mongoose.model("employee", employeeSchema);

class EmployeeModel {
  createDetails = (employeeDetails, saveEmployeeData) => {
    const newEmployee = new employeeDbData({
      fName: employeeDetails.fName,
      lName: employeeDetails.lName,
      email: employeeDetails.email,
      password: employeeDetails.password,
      confirmPassword: employeeDetails.confirmPassword,
    });
    newEmployee.save((error, data) => {
      return error
        ? saveEmployeeData(error, null)
        : saveEmployeeData(null, data);
    });
  };

  loginEmployee = (loginData, authenticateEmployee) => {
    employeeDbData.findOne({ email: loginData.email, password: loginData.password }, (error, data) => {
      if (error) {
        return authenticateEmployee(error, null);
      } else if (!data) {
        return authenticateEmployee("Invalid Employee Credentials", null);
      }
      return authenticateEmployee(null, data);
    });
  };
}
module.exports = new EmployeeModel();
