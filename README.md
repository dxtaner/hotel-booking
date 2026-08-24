# 🏨 Hotel Booking System (StayFinder)

A modern, full-stack hotel booking and management platform. Built on the MERN stack, it allows users to search for hotels and make reservations while providing admins with tools to manage hotels and booking workflows.

---

## ✨ Features

### 👤 User Side
- **User Authentication:** Secure JWT-based registration and login system.
- **Hotel Search & Filter:** Real-time search by hotel name or location (city/country).
- **Booking Management:** Seamless reservation process with check-in/check-out date validation and past-date prevention.
- **My Bookings:** View active and past reservations with an option to cancel eligible bookings.
- **Experiences & About:** Informational pages featuring curated local tours, activities, and platform details.
- **Responsive & Modern UI:** Mobile-ready hamburger menu, skeleton loaders, and Toastify notifications.

### 🛠 Admin Side
- **Admin Management Panel:** Protected route accessible only to authorized admin accounts (`AdminRoute`).
- **Hotel Management:** Add new hotels, view existing listings, and delete hotels (`DELETE`).
- **Booking Oversight:** Monitor all user reservations across the platform.

---

## 📂 Project Structure

```text
hotel-booking/
├── backend/            # Express.js API & MongoDB Models
│   ├── config/         # Database connection configuration
│   ├── controllers/    # Auth, Hotel, and Booking logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Main server entry point
├── frontend/           # React Client UI
│   ├── src/
│   │   ├── api/        # Axios configuration
│   │   ├── components/ # Navbar, Footer, Route Guards
│   │   ├── context/    # AuthContext (Global state)
│   │   └── pages/      # Home, HotelDetail, AdminDashboard, etc.
└── README.md
