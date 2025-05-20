import React from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate to handle navigation
import Navbar from "./Navbar"; // Navbar component import
import aiImg from "../assets/ai-image.jpg"; // Importing an image asset

const Home = () => {
    const navigate = useNavigate(); // Using React Router's useNavigate hook to navigate between pages

    // Function to navigate to the login page
    const handleLoginBtn = () => {   
        navigate("/login");
    }

    // Function to navigate to the registration page
    const handleRegisterBtn = () => {
        navigate("/register");
    }

    return (
       // Full-page layout with fixed position and scroll enabled on small devices
       <div className="d-flex flex-column position-fixed top-0 w-100 overflow-auto overflow-md-visible" style={{ maxHeight: "100vh" }}>

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Section */}
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 px-4 py-3" style={{marginTop:"100px"}}>
        
        {/* Textual Welcome Section */}
        <div className="text-section mb-4 mb-md-0">
          <h2 className="fw-bold" style={{ color: "#0000ff" }}>
            Welcome to <span style={{ textDecoration: "underline" }}>Novaguide</span>!
          </h2>
          <h1 className="display-5 fw-bold" style={{ color: "#0000ff" }}>
            Your Friendly AI Assistant
          </h1>
          <p className="lead" style={{ color: "#0000ff" }}>
            Ask me anything, anytime.
          </p>

          {/* Button Section */}
          <div className="mt-4 d-flex gap-3">
            {/* Login Button with hover effect */}
            <button
              type="button"
              onClick={handleLoginBtn}
              className="btn rounded-pill px-4 py-2 text-white fw-semibold shadow"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
                border: "none",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Login
            </button>

            {/* Register Button with hover effect */}
            <button
              type="button"
              onClick={handleRegisterBtn}
              className="btn rounded-pill px-4 py-2 fw-semibold text-primary border-primary shadow"
              style={{
                backgroundColor: "#ffffff",
                border: "2px solid",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e0ecff";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.transform = "scale(1)";
              }}
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Image Section to the right */}
        <div>
          <img
            src={aiImg}
            alt="AI Assistant"
            className="rounded-4 shadow-lg"
            style={{ height: "430px", width: "400px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
    )
}

export default Home; // Exporting the Home component
