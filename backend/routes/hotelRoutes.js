const express = require("express");
const router = express.Router();
const {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");
const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", getHotels);
router.get("/:id", getHotelById);

router.post("/", protect, admin, createHotel);
router.put("/:id", protect, admin, updateHotel);
router.delete("/:id", protect, admin, deleteHotel);

module.exports = router;
