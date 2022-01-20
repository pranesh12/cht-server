const tourGuideModel = require("../models/tourguide");
const userModel = require("../models/user");
const moment = require("moment");
const dateFormat = moment().format("l");

const allTourGuides = async (req, res) => {
  try {
    const guides = await tourGuideModel.find({});
    res.json(guides);
  } catch (error) {
    res.json(error);
  }
};

const findTourguideByDistrictAndPlace = async (req, res) => {
  try {
    const { district, place } = req.query;
    const guides = await tourGuideModel.find({ district, place });
    res.json(guides);
  } catch (error) {
    res.json(error);
  }
};

//TourGuides by district
const tourGuidesByDistrict = async (req, res) => {
  try {
    const { district } = req.query;
    const guides = await tourGuideModel.find({ district });
    res.json(guides);
  } catch (error) {
    res.json(error);
  }
};

//tour create
const addTourGuideByAdmin = async (req, res) => {
  console.log("creating add tour");
  try {
    const { district, place, name, phone_number, status, img } = req.body;

    const { email } = req.query;
    const isAdmin = await userModel.findOne({ email });
    if (isAdmin) {
      await tourGuideModel.create({
        district,
        place,
        info: {
          name,
          phone_number,
          email,
          img,
          status,
          dateFormat,
        },
      });
      res.status(200).send("guided added succssfully");
      console.log("created by tourguide");
    } else {
      res.status(404).send({ message: "You don't have access" });
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//TourbyId

const tourguideById = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("tour guide by id");
    const foundedGuide = await tourGuideModel.findOne({ _id: id });
    res.json(foundedGuide);
  } catch (error) {
    res.json(error);
  }
};

//Tour Edit by admin
const editTourguideByAdmin = async (req, res) => {
  const { id, newtourGuide } = req.body;
  const { district, place, name, phone_number, gmail, status, img } = newtourGuide;
  console.log(img);
  try {
    const newData = {
      district,
      place,
      info: {
        name,
        phone_number,
        email,
        img,
        status,
        dateFormat,
      },
    };
    await tourGuideModel.findByIdAndUpdate(id, newData, { new: true });
    res.status(200).json({ message: "Tour guide updated successfull" });
  } catch (error) {
    res.json(error);
  }
};

//edit tour guide by individual guide
const editTourguidebytourguide = async (req, res) => {
  const { email } = req.query;
  const { district, place, name, phone_number, gmail, status, img } = req.body;
  console.log(req.body);
  // const foundedGuide = await tourGuideModel.findOne({ "info.gmail": email });
  // const foundedgmail = foundedGuide.info.gmail;
  try {
    const updatedData = {
      district,
      place,
      info: {
        name,
        phone_number,
        email,
        img,
        status,
        dateFormat,
      },
    };
    await tourGuideModel.findOneAndUpdate(gmail, updatedData, {
      new: true,
    });
    // console.log("update by guide successfull");
    res.status(200).json({ message: "Tour guide updated successfull by guide" });
  } catch (error) {
    console.log("error");
  }
};

//find Tour guide by email
const findtourguideByEmail = async (req, res) => {
  try {
    console.log("findBy email running");
    const { email } = req.query;
    const foundedGuide = await tourGuideModel.findOne({ "info.email": email });
    res.json(foundedGuide);
  } catch (error) {
    res.json(error);
  }
};

//romve tour guide
const removeTourGuideByAdmin = async (req, res) => {
  try {
    const { id } = req.query;
    await tourGuideModel.deleteOne({ _id: id });
    res.json("TourGuide  removed");
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  allTourGuides: allTourGuides,
  findTourguideByDistrictAndPlace: findTourguideByDistrictAndPlace,
  addTourGuideByAdmin: addTourGuideByAdmin,
  editTourguideByAdmin: editTourguideByAdmin,
  removeTourGuideByAdmin: removeTourGuideByAdmin,
  tourGuidesByDistrict: tourGuidesByDistrict,
  tourguideById: tourguideById,
  editTourguidebytourguide: editTourguidebytourguide,
  findtourguideByEmail: findtourguideByEmail,
};
