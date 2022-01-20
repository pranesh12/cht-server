const express = require("express");
const {
  getAllReview,
  addReview,
  removeReview,
  updateReview,
  findReviewByEmail,
} = require("../controllers/review");

const router = express.Router();
router.get("/reviews", getAllReview);
router.post("/review", addReview);
router.get("/review", findReviewByEmail);
router.delete("/review", removeReview);
router.put("/review", updateReview);
module.exports = router;
