const reviewModel = require("../models/review");

const getAllReview = async (req, res) => {
  try {
    const review = await reviewModel.find({});
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
  }
};

const addReview = async (req, res) => {
  try {
    const { comment, currentValue } = req.body;
    const { email, name } = req.query;
    await reviewModel.create({
      comment,
      star: currentValue,
      user: {
        email,
        name,
      },
    });
    console.log("Add comment hitted");
    res.json({ meassage: "Your review added succesfully" });
  } catch (error) {
    console.log(error);
  }
};

const removeReview = async (req, res) => {
  const { id } = req.params;
  try {
    await reviewModel.deleteOne({ _id: id });
    res.json("review deleted succefully");
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (req, res) => {
  try {
    const { comment, currentValue } = req.body;
    console.log(req.body);
    const { email, name } = req.query;
    const newReview = {
      comment: comment,
      star: currentValue,
      user: {
        email,
        name,
      },
    };
    await reviewModel.findOneAndUpdate("user.email", newReview);
    console.log("Edit comment hitted");
  } catch (error) {
    console.log(error);
  }
};
//find reviw by email
const findReviewByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const foundedReview = await reviewModel.findOne({ "user.email": email });
    res.json(foundedReview);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllReview: getAllReview,
  addReview: addReview,
  removeReview: removeReview,
  updateReview: updateReview,
  findReviewByEmail: findReviewByEmail,
};
