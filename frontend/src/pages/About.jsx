import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About HotelBooking</h1>
        <p>Connecting travelers with seamless stay experiences worldwide.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At HotelBooking, our goal is to simplify hotel reservations by
            offering an intuitive platform with real-time availability, clear
            pricing, and effortless booking management.
          </p>
        </section>

        <div className="about-stats-grid">
          <div className="about-stat-card">
            <h3>500+</h3>
            <p>Partner Hotels</p>
          </div>
          <div className="about-stat-card">
            <h3>50k+</h3>
            <p>Happy Guests</p>
          </div>
          <div className="about-stat-card">
            <h3>24/7</h3>
            <p>Customer Support</p>
          </div>
        </div>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul className="about-list">
            <li>✔ Verified guest reviews and authentic room images.</li>
            <li>✔ Instant booking confirmations without hidden fees.</li>
            <li>✔ Flexible cancellation policies on eligible bookings.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
