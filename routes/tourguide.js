const express = require("express");

const {
  allTourGuides,
  editTourguideByAdmin,
  addTourGuideByAdmin,
  findTourguideByDistrictAndPlace,
  tourGuidesByDistrict,
  removeTourGuideByAdmin,
  tourguideById,
  editTourguidebytourguide,
  findtourguideByEmail,
} = require("../controllers/tourguide");

const router = express.Router();
router.get("/tourguides", allTourGuides);
router.get("/tourguide", tourguideById);
router.post("/tourguide", addTourGuideByAdmin);
router.put("/tourguide", editTourguideByAdmin);
router.delete("/tourguide", removeTourGuideByAdmin);

router.get("/tourguide/mail", findtourguideByEmail);
router.get("/tourguide/district", tourGuidesByDistrict);
router.get("/tourguide/district&place", findTourguideByDistrictAndPlace);

router.put("/editTourguidebytourguide", editTourguidebytourguide);

module.exports = router;
