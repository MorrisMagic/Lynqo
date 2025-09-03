const jwt = require("jsonwebtoken");
const AuthWare = (req, res, next) => {
  const { auth_token } = req.cookies;
  if (!auth_token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decode = jwt.verify(auth_token, process.env.JWTSC);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decode.id;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = AuthWare;
