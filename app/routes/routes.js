const user = require("../controller/user");
const userValidation = require("../util/userValidation");
const auth = require("../util/auth");

module.exports = (app) => {
  app.post("/register", userValidation, user.register);
  app.post("/login", auth, user.login);
};
