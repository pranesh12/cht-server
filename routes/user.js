const express = require("express");
const router = express.Router();
const {
  register,
  userList,
  login,
  deleteUserAccount,
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get("/userList", userList);
router.delete("/removeAccount", deleteUserAccount);

module.exports = router;
