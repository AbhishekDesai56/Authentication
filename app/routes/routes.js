const user = require("../controller/user");
const userValidation = require("../util/userValidation");

module.exports = (app) => {
  app.post("/register", userValidation, user.register);
  app.post("/login", user.login);
};
