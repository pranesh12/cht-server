const express = require("express");
const {
  getAllInfo,
  addArticles,
  removeArticle,
  getArticleById,
  updateArticle,
} = require("../controllers/article");
const auth = require("../middleware/authChecker");

const router = express.Router();

router.get("/articles", getAllInfo);
router.post("/article", addArticles);
router.put("/article", updateArticle);
router.delete("/article", removeArticle);
router.get("/article", getArticleById);

module.exports = router;
