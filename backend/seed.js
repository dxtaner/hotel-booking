const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Hotel = require("./models/Hotel");
const connectDB = require("./config/db");

dotenv.config();

const hotels = [
  {
    name: "Grand Horizon Resort",
    description:
      "Luxury beachfront resort offering panoramic ocean views, infinity pools, and world-class spa amenities.",
    location: {
      address: "Beachfront Avenue 102",
      city: "Antalya",
      country: "Turkey",
    },
    pricePerNight: 240,
    totalRooms: 120,
    availableRooms: 85,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    ],
  },
  {
    name: "Bosphorus Elite Hotel",
    description:
      "Elegantly designed hotel located in the heart of Istanbul with spectacular Bosphorus strait views.",
    location: {
      address: "Bosphorus Street 45",
      city: "Istanbul",
      country: "Turkey",
    },
    pricePerNight: 310,
    totalRooms: 80,
    availableRooms: 40,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    ],
  },
  {
    name: "Cappadocia Cave Suites",
    description:
      "Unique boutique cave hotel featuring authentic stone architecture, private terraces, and hot air balloon views.",
    location: {
      address: "Goreme Valley No: 12",
      city: "Nevsehir",
      country: "Turkey",
    },
    pricePerNight: 190,
    totalRooms: 25,
    availableRooms: 10,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    ],
  },
  {
    name: "Alpine Pines Retreat",
    description:
      "Cozy mountain lodge surrounded by pine forests, perfect for winter skiing and summer nature hiking.",
    location: {
      address: "Peak Road 8",
      city: "Bursa",
      country: "Turkey",
    },
    pricePerNight: 140,
    totalRooms: 50,
    availableRooms: 30,
    images: [
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
    ],
  },
  {
    name: "Bodrum Sun & Bay Hotel",
    description:
      "Modern seaside hotel with private docks, crystal clear water access, and vibrant nightlife nearby.",
    location: {
      address: "Marina Drive 27",
      city: "Mugla",
      country: "Turkey",
    },
    pricePerNight: 280,
    totalRooms: 100,
    availableRooms: 60,
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    ],
  },
  {
    name: "Fethiye Sunset Lagoon",
    description:
      "Peaceful villa resort nestled in Oludeniz with lush green gardens and private bungalow options.",
    location: {
      address: "Oludeniz Street 5",
      city: "Fethiye",
      country: "Turkey",
    },
    pricePerNight: 165,
    totalRooms: 35,
    availableRooms: 18,
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
    ],
  },
  {
    name: "Metropolitan City Suites",
    description:
      "Contemporary business and lifestyle hotel situated close to financial districts and shopping centers.",
    location: {
      address: "Kizilay Boulevard 89",
      city: "Ankara",
      country: "Turkey",
    },
    pricePerNight: 120,
    totalRooms: 150,
    availableRooms: 95,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c",
    ],
  },
  {
    name: "Aegean Pearl Resort",
    description:
      "All-inclusive beach resort offering water sports, gourmet dining, and family-friendly entertainment.",
    location: {
      address: "Cesme Coast 14",
      city: "Izmir",
      country: "Turkey",
    },
    pricePerNight: 210,
    totalRooms: 90,
    availableRooms: 45,
    images: [
      "https://images.unsplash.com/photo-1529290130-4ca3753253ae",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    ],
  },
];

const seedHotels = async () => {
  try {
    await connectDB();
    await Hotel.deleteMany();
    await Hotel.insertMany(hotels);
    console.log("Hotel data successfully seeded!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedHotels();
