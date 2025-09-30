import React, { useState, useEffect } from "react";
import "./Message.css"; // import the custom CSS

export default function NewFeaturePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenMLSheetPopup');
    
    if (!hasSeenPopup) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    // Disable scrolling when popup is visible
    if (visible) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      // Cleanup - re-enable scrolling
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, [visible]);

  const handleClose = () => {
    // Mark popup as seen when user closes it
    localStorage.setItem('hasSeenMLSheetPopup', 'true');
    setVisible(false);
  };

  const handleOverlayClick = (e) => {
    // Close popup if clicking on the overlay (not the popup box itself)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleExploreClick = () => {
    // Mark popup as seen when user clicks explore
    localStorage.setItem('hasSeenMLSheetPopup', 'true');
    window.location.href = "/ml_sheet";
  };

  if (!visible) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-box">
        <h2 className="popup-title">Introducing ML Sheet</h2>
        <p className="popup-text">
          A curated roadmap for mastering{" "}
          <span className="highlight">Machine Learning</span>, inspired by
          Striver's SDE Sheet — but made for ML enthusiasts at IIT Kharagpur
          and beyond.
        </p>
        <div className="popup-actions">
          <button
            className="popup-btn primary"
            onClick={handleExploreClick}
          >
            Explore ML Sheet
          </button>
          <button className="popup-btn secondary" onClick={handleClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}