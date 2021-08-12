const employee = require("../controller/employee.controller.js");
module.exports = (app) => {
  app.post("/register", employee.register);
  app.post("/login", employee.login);
};
