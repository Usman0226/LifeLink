const jwt = require("jsonwebtoken");
require("dotenv").config();
const donor = require("../models/user");

const auth = async function (req, res, next) {
  try {
    const token = req.cookies.token;

    if (token) {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      const user = await donor.findById(verify.id);
      if (!user) {
        return res.redirect("/login");
      }

      req.user = user;
      return next();
    }

    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const verify = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await donor.findOne({ refreshToken });

      if (!user) {
        return res.redirect("/login");
      }

      const newToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: parseInt(process.env.JWT_EXPIRES_IN, 10) * 1000,
      });

      req.user = user;
      return next();
    }

    return res.redirect("/login");
  } catch (error) {
    console.error("Auth error:", error);
    return res.redirect("/login");
  }
};

module.exports = auth;
