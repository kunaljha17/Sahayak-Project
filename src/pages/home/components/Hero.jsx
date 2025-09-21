import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <section id="home" className="bg-blue-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Solve Municipal Issues Easily</h2>
        <p className="text-lg mb-6">
          Report potholes, streetlight issues, and more directly to the authorities.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
