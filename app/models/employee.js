const mongoose = require("mongoose");
const logger = require('logger').createLogger('logger/development.log');

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
    saveEmployee = (employeeDetails, saveemployeeData) => {
      const newEmployeeData = new Employeedb({
        name: employeeDetails.name,
        gender: employeeDetails.gender,
        department: employeeDetails.department,
        salary: employeeDetails.salary,
        startDate: employeeDetails.startDate,
        note: employeeDetails.note,
      });

      newEmployeeData.save((error, data) => {
        return error ? saveemployeeData(error, null) : saveemployeeData(null, data);
      });
    }

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

    updateEmployeeDetails =  (employeeId, employeeDetails, updateEmployee) => {
      Employeedb.findByIdAndUpdate(employeeId, employeeDetails, (err, data) => {
          return err ? updateEmployee(err, null) : updateEmployee(null, data);
      });
    }

    deleteEmployeeById = (employeeId, deleteEmployeeById) => {
      try {
        Employeedb.findByIdAndRemove(employeeId, (error, data) => {
          return error ? deleteEmployeeById(error, null) : deleteEmployeeById(null, data);
        });
      } catch (error) {
        logger.error(`deleteEmployeeById method model error ${error}`);
        deleteEmployeeById(error, null);
      }
    }
}

module.exports = new EmployeeModel();
