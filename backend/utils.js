const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, "terve", {
    expiresIn: "1h",
  });
};
const verifyToken = (token) => {
  return jwt.verify(token, "terve");
};
module.exports = { generateToken, verifyToken };
