const articleModel = require("../models/articleModel");

const getAllInfo = async (req, res) => {
  try {
    const info = await articleModel.find({});
    res.json(info);
  } catch (error) {
    console.log(error);
  }
};

const addArticles = async (req, res) => {
  try {
    const { category, writer, header, article, img } = req.body;
    await articleModel.create({
      category,
      writer,
      data: {
        image: img,
        header,
        article,
      },
    });
    res.json({ meassage: "course Created succesfuly" });
  } catch (error) {
    res.json(error);
  }
};

const removeArticle = async (req, res) => {
  try {
    const { id } = req.query;
    await articleModel.deleteOne({ _id: id });
    res.json("Data removded");
  } catch (error) {
    res.json(error);
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.query;
    const foundArticle = await articleModel.findOne({ _id: id });
    res.json(foundArticle);
  } catch (error) {
    res.json(error);
  }
};

const updateArticle = async (req, res) => {
  const { id, newData } = req.body;
  const { category, writer, header, article, img } = newData;
  try {
    const newData = {
      category,
      writer,
      data: {
        image: img,
        header,
        article,
      },
    };
    await articleModel.findByIdAndUpdate(id, newData, { new: true });
    res.status(200).json({ message: "update successfull" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getAllInfo: getAllInfo,
  addArticles: addArticles,
  removeArticle: removeArticle,
  getArticleById: getArticleById,
  updateArticle: updateArticle,
};
