import React, { useState, useEffect } from "react";
import "./Message.css"; 

export default function NewFeaturePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleExploreClick = () => {
    window.location.href = "/ml_sheet";
  };

  if (!visible) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-box">
        <h2 className="popup-title">Register for KDSH 2026</h2>
        <p className="popup-text">
          The {" "}
          <span className="highlight">Kharagpur Data Science Hackathon</span>, is India&apos;s 
          premier student-led Data Science hackathon, organized by the Kharagpur Data Analytics Group 
          in association with Kshitij, IIT Kharagpur.<br></br><br></br>

          Compete with 10,000+ participants from 200+ institutions to solve real-world challenges in Data Science, 
          Machine Learning, and AI on one of Asia’s largest techno-management platforms.
        </p>
        <div className="popup-actions">
          <button
            className="popup-btn primary"
            onClick={handleExploreClick}
          >
            Register Now
          </button>
          <button className="popup-btn secondary" onClick={handleClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
