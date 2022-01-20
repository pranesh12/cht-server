require("dotenv").config();
let jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATEKEY;

const auth = (req, res, next) => {
  console.log(req.headers.authorization.split(" ")[1]);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, privateKey);
    req.userData = decoded;
    next();
  } catch (error) {
    res.json({ message: "UnAuthorized" });
  }
};

module.exports = auth;
