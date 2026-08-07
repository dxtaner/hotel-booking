const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    amenities: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalRooms: {
      type: Number,
      required: true,
      min: 1,
    },

    availableRooms: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: ["Hotel", "Resort", "Apartment", "Villa", "Hostel"],
      default: "Hotel",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Hotel", hotelSchema);
