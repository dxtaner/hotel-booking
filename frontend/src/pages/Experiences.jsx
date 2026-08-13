import React from "react";
import "./Experiences.css";

const experiencesList = [
  {
    id: 1,
    title: "Cappadocia Hot Air Balloon Tour",
    location: "Nevsehir, Turkey",
    duration: "3 Hours",
    price: "$180",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7",
    category: "Adventure",
  },
  {
    id: 2,
    title: "Bosphorus Sunset Yacht Cruise",
    location: "Istanbul, Turkey",
    duration: "2 Hours",
    price: "$90",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b",
    category: "Sightseeing",
  },
  {
    id: 3,
    title: "Oludeniz Paragliding Experience",
    location: "Fethiye, Turkey",
    duration: "4 Hours",
    price: "$150",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18",
    category: "Extreme Sports",
  },
  {
    id: 4,
    title: "Ancient Ephesus Guided Tour",
    location: "Izmir, Turkey",
    duration: "Full Day",
    price: "$65",
    image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c",
    category: "Culture & History",
  },
];

const Experiences = () => {
  return (
    <div className="experiences-container">
      <div className="experiences-header">
        <h1>Unforgettable Experiences</h1>
        <p>Discover handpicked activities and guided tours near your stays.</p>
      </div>

      <div className="experiences-grid">
        {experiencesList.map((exp) => (
          <div key={exp.id} className="experience-card">
            <img src={exp.image} alt={exp.title} className="experience-img" />
            <div className="experience-body">
              <span className="experience-badge">{exp.category}</span>
              <h3 className="experience-title">{exp.title}</h3>
              <p className="experience-location">📍 {exp.location}</p>
              <div className="experience-footer">
                <span className="experience-duration">⏱ {exp.duration}</span>
                <span className="experience-price">{exp.price} / person</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
