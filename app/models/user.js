const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../service/user");

const userSchema = mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  token: { type: String },
});

const userDbData = mongoose.model("user", userSchema);

class UserModel {
  createDetails = (userDetails, saveUserData) => {
    const token = jwt.sign(
      { email: userDetails.email },
      process.env.TOKEN_KEY,
      { expiresIn: "60s" }
    );
    const newUser = new userDbData({
      fName: userDetails.fName,
      lName: userDetails.lName,
      email: userDetails.email,
      password: userDetails.password,
      confirmPassword: userDetails.confirmPassword,
      token: token,
    });
    newUser.save((error, data) => {
      return error ? saveUserData(error, null) : saveUserData(null, data);
    });

    //save user token
    userDetails.token = token;
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
            return authenticateUser("Invalid User Credentials", null);
          }

          const token = jwt.sign(
            { email: loginData.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "60s",
            }
          );

          // save user token
          loginData.token = token;
          return authenticateUser(null, data);
        });
      }
    });
  };
}

module.exports = new UserModel();
