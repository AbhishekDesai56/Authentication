const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Helper {
  generateToken(data) {
    return jwt.sign({ data }, process.env.TOKEN_KEY, { expiresIn: "60s" });
  }

  securePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
}
module.exports = new Helper();
