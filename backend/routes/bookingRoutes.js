const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  cancelBooking,
} = require("../controllers/bookingController.js");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/", createBooking);
router.get("/my-bookings", getUserBookings);
router.put("/:id/cancel", cancelBooking);

module.exports = router;
