/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Helper {
  // eslint-disable-next-line class-methods-use-this
  generateToken(data) {
    return jwt.sign({ data }, process.env.TOKEN_KEY, { expiresIn: "30m" });
  }

  securePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  
  decryptPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  // eslint-disable-next-line no-trailing-spaces
  }; 
}
module.exports = new Helper();
