import React from "react";
import "./CSS/LandingPage.css";
import heroImage from "../assets/images/Ao.png";

const LandingPage = () => {
  return (
    <div>
      <div className="landing-page">
        <div className="landing-page-content">
          <div className="landingpage-text-content">
            <p>Revolutionize the Way You Bid and Sell with Our Auction Hub.</p>
          </div>
          <img src={heroImage} alt="" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
