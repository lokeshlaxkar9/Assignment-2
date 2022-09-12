const jwt = require("jsonwebtoken");
const User = require("../modals/User");
const AppError = require("../utils/AppError");

const checkAuth = async (req, res, next) => {
  //   const token = req.cookies.jwt;
  const token = req.headers.authorization;
  //   console.log(req.headers.authorization);
  if (token) {
    jwt.verify(token, "tenx", async (err, decodedToken) => {
      if (err) {
        next(new AppError("user not verified", 401));
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    next(new AppError("Login to get access", 401));
  }
};

module.exports = checkAuth;
