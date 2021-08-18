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
    bcrypt.compare(passwordEnteredByUser, hash.password, (err, isMatch) => {
      if (err) {
        throw err;
      } else if (!isMatch) {
        return authenticateUser("Password doesn't match!", null);
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
    });
  };
}

module.exports = new UserModel();
