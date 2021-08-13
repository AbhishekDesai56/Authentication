const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const userDbData = mongoose.model("user", userSchema);

class UserModel {
  createDetails = (userDetails, saveUserData) => {
    const newUser = new userDbData({
      fName: userDetails.fName,
      lName: userDetails.lName,
      email: userDetails.email,
      password: userDetails.password,
      confirmPassword: userDetails.confirmPassword,
    });
    newUser.save((error, data) => {
      return error ? saveUserData(error, null) : saveUserData(null, data);
    });
  };

  loginUser = async (loginData, authenticateUser) => {
    const passwordEnteredByUser = loginData.password;
    const hash = await userDbData.findOne({ email: loginData.email });
    bcrypt.compare(passwordEnteredByUser, hash.password, (err, isMatch) => {
      if (err) {
        throw err;
      } else if (!isMatch) {
        return authenticateUser("Password doesn't match!", null);
      } else {
        userDbData.findOne({ email: loginData.email }, (error, data) => {
          if (error) {
            return authenticateUser(error, null);
          } else if (!data) {
            return authenticateUser("Invalid Employee Credentials", null);
          }
          return authenticateUser(null, data);
        });
      }
    });
  };
}

module.exports = new UserModel();
