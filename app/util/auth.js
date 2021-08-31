/**
 * @description function to verify the token.
 * @returns 
 */

const jwt = require("jsonwebtoken");

const config = process.env;

class Auth {
   verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization;

    if (!token) {
      return res.status(403).send("A token is required for authenication");
    }

    try {
      var removedBearerFromHeaderToken = token.replace("Bearer",'').trim();
      const decoded = jwt.verify(removedBearerFromHeaderToken, config.TOKEN_KEY);
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
}

module.exports = new Auth();
