const user = require("../controller/user");
const employee = require("../controller/employee");
const userValidation = require("../util/userValidation");

module.exports = (app) => {
  app.post("/register", userValidation, user.register);
  app.post("/login", user.login);

  // employee CRUD api
  app.post('/createEmployee', employee.saveEmployee);
  app.get('/getEmployees', employee.getAllEmployee);
  app.get('/getEmployeeById/:employeeId', employee.getEmployeeById);
  app.put('/updateEmployeeDetail/:employeeId', employee.updateEmployeeDetail);
};
