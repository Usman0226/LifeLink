const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../../models/user");

const auth = async function (req, res, next) {
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;
  if (!token && refreshToken) {
    try {
      const refreshTokenVerify = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
      const user = await User.findOne({ refreshToken });
      if (!user) {
        return res.redirect("/login");
      }
      req.user = refreshTokenVerify;
      return next();
    } catch (Error) {
      console.error(Error);
    }
  }

  if (token) {
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verify;
      return next();
      console.log(req.user);
    } catch (err) {
      console.error("Invalid token");
      return res.redirect("/login");
    }
  }

  return res.redirect("/login");
};

module.exports = auth;
