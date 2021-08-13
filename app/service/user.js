const model = require("../models/user");

class UserService {
  registerUser = (userData, saveUserData) => {
    model.createDetails(userData, (err, data) => {
      if (err) {
        saveUserData(err, null);
      } else {
        saveUserData(err, data);
      }
    });
  };

  loginUser = (loginDetails, authenticateUser) => {
    model.loginUser(loginDetails, (err, data) => {
      if (err) {
        authenticateUser(err, null);
      } else {
        authenticateUser(null, data);
      }
    });
  };
}

module.exports = new UserService();
