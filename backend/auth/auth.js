const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authorization failed!",
      success: false,
    });
  }
};

module.exports = checkAuth;
