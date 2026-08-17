const express = require("express");
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  cancelBooking,
  getAllBookings,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/my-bookings", protect, getUserBookings);
router.post("/", protect, createBooking);
router.put("/:id/cancel", protect, cancelBooking);

router.get("/admin/all", protect, admin, getAllBookings);

module.exports = router;
