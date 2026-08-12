import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import "./Home.css";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await API.get("/hotels");
        setHotels(res.data.hotels);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load hotels.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location?.country?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      maxPrice === "" || hotel.pricePerNight <= Number(maxPrice);

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="home-container">
      <div className="filter-card">
        <div className="filter-group">
          <input
            type="text"
            className="filter-input"
            placeholder="Search by hotel name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <input
            type="number"
            className="filter-input"
            placeholder="Max price per night ($)..."
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        {(searchTerm || maxPrice) && (
          <div className="filter-group">
            <button
              className="clear-filter-btn"
              onClick={() => {
                setSearchTerm("");
                setMaxPrice("");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <h1 className="home-title">Popular Stays</h1>

      {loading ? (
        <div className="home-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="skeleton-card">
              <div className="skeleton-img"></div>
              <div style={{ padding: "1.25rem" }}>
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text skeleton-subtitle"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredHotels.length === 0 ? (
        <div
          style={{ textAlign: "center", marginTop: "2rem", color: "#64748b" }}
        >
          <p>No hotels match your search criteria.</p>
        </div>
      ) : (
        <div className="home-grid">
          {filteredHotels.map((hotel) => (
            <div key={hotel._id} className="home-card">
              <img
                src={
                  hotel.images?.[0] ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                }
                alt={hotel.name}
                className="home-card-img"
              />
              <div className="home-card-body">
                <h3 className="home-card-title">{hotel.name}</h3>
                <p className="home-card-location">
                  📍 {hotel.location?.city}, {hotel.location?.country}
                </p>
                <p className="home-card-price">
                  ${hotel.pricePerNight} / night
                </p>
                <Link to={`/hotels/${hotel._id}`} className="home-btn-detail">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
