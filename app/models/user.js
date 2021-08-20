/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable indent */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const auth = require("../util/helper");

const userSchema = mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const Userdb = mongoose.model("user", userSchema);

class UserModel {
  createDetails = (userDetails, saveUserData) => {
    const newUser = new Userdb({
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
    const hash = await Userdb.findOne({ email: loginData.email });
    if(hash === null)
      return authenticateUser("Invalid User Credentials", null);

    const isPasswordMatch = await auth.decryptPassword(passwordEnteredByUser, hash.password);
    if (!isPasswordMatch) {
        return authenticateUser("Password doesn't match!", null);
      // eslint-disable-next-line no-else-return
      } else {
        Userdb.findOne({ email: loginData.email }, (error, data) => {
          if (error) {
            return authenticateUser(error, null);
          }
          if (!data) {
            return authenticateUser("Invalid User Credentials", null);
          }
          const token = auth.generateToken(data);
          return authenticateUser(null, token);
        });
      }
  };
}

module.exports = new UserModel();
