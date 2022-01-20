const userModel = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATEKEY;

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body.registerData;
    const { guide } = req.body;
    const hasAccount = await userModel.findOne({ email: email });
    if (!hasAccount) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        isGuide: guide,
      });

      const token = jwt.sign({ email: newUser.name, _id: newUser._id }, privateKey, {
        expiresIn: "24h",
      });
      const result = {
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isGuide: newUser.isGuide,
        token,
      };
      return res.json(result);
    }
  } catch (error) {
    return res.status(404).json({ msg: "Register Failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const oldUser = await userModel.findOne({ email: email });
    if (!oldUser) return res.status(401).json({ msg: "Unvalid Credential" });
    const matchPassword = await bcrypt.compare(password, oldUser.password);
    if (!matchPassword) return res.status(401).json({ msg: "Unvalid Credential" });

    const token = jwt.sign({ email: oldUser.name, _id: oldUser._id }, privateKey, {
      expiresIn: "24h",
    });

    const result = {
      name: oldUser.name,
      email: oldUser.email,
      isAdmin: oldUser.isAdmin,
      isGuide: oldUser.isGuide,
      token,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({ msg: "Unvalid Credential" });
  }
};

const userList = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await userModel.findOne({ email });
    const isAdmin = user.isAdmin;
    if (isAdmin) {
      const foundedUserlist = await userModel.find({}).select("email name");
      res.status(200).send(foundedUserlist);
    } else {
      res.status(404).send({ message: "You don't have access" });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const { id, email } = req.query;
    const isAdmin = await userModel.find({ email });
    if (isAdmin) {
      await userModel.findOneAndDelete({ _id: id });
      res.status(200).send({ message: "Account succesfully Deleted" });
    } else {
      res.status(404).send({ message: "You don't have access" });
    }
  } catch (error) {
    res.status(200).send(error);
  }
};

module.exports = {
  register: register,
  login: login,
  userList: userList,
  deleteUserAccount: deleteUserAccount,
};
