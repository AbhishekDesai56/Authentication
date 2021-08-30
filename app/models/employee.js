const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  department: {
    type: Array,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
});

const Employeedb = mongoose.model("employee", employeeSchema);

class EmployeeModel {
    saveEmployee = (employeeDetails, saveUserData) => {
      const newEmployeeData = new Employeedb({
        name: employeeDetails.name,
        gender: employeeDetails.gender,
        department: employeeDetails.department,
        salary: employeeDetails.salary,
        startDate: employeeDetails.startDate,
        note: employeeDetails.note,
      });

      newEmployeeData.save((error, data) => {
        return error ? saveUserData(error, null) : saveUserData(null, data);
      });
    };

    getAllEmployee = (getEmployees) => {
      Employeedb.find({}, (error, data) => {
        return error ? getEmployees(error, null) : getEmployees(null, data);
      });
    }

    employeeById = (employeeId, getEmployeeById) => {
      Employeedb.findById(employeeId, (error, data) => {
        return error ? getEmployeeById(error, null) : getEmployeeById(null, data);
      });
    }
}

module.exports = new EmployeeModel();
