import React, { useState, useEffect } from "react";

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
    window.location.href = "/register-kdsh";
  };

  if (!visible) return null;

  return (
    <>
      <style>{messageStyles}</style>
      <div className="popup-overlay" onClick={handleOverlayClick}>
        <div className="popup-box">
          <h2 className="popup-title">Register for KDSH 2026</h2>
          <p className="popup-text">
            The {" "}
            <span className="popup-highlight">Kharagpur Data Science Hackathon</span>, is India&apos;s
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
    </>
  );
}

// Kept as real CSS (same pattern as TeamPage.jsx / LandingPage.jsx): gradient
// text, a keyframed entrance and the 450px breakpoint don't map to exact
// Tailwind tokens. Copied from Message.css. Two renames to avoid clashing with
// other pages' global rules: @keyframes fadeIn/slideUp -> popupFadeIn/
// popupSlideUp (fadeIn is also defined in NotFound.css and Animation.css with
// different values) and .highlight -> .popup-highlight.
const messageStyles = `
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: popupFadeIn 0.3s ease;
}

@keyframes popupFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popupSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.popup-box {
  background: rgb(10, 10, 10);
  border: 2px solid rgba(195, 65, 65, 0.3);
  color: #fff;
  border-radius: 20px;
  padding: 2rem;
  max-width: 470px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(195, 65, 65, 0.2), 0 0 80px rgba(195, 65, 65, 0.1);
  animation: popupSlideUp 0.4s ease;
}

.popup-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
  background: linear-gradient(135deg, #d24747, #cf5a5a, #dc6464);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  text-shadow: 0 0 40px rgba(207, 90, 90, 0.3);
}

.popup-text {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.popup-highlight {
  color: rgb(195, 65, 65);
  font-weight: 600;
}

.popup-actions {
  display: flex;
  flex-direction: row;
  gap: 0.9rem;
}

.popup-btn {
  padding: 0.7rem 1.0rem;
  width: 200px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.popup-btn.primary {
  background: rgb(195, 65, 65);
  color: #fff;
  border: 3px solid rgb(112, 43, 43);
}

.popup-btn.secondary {
  background: transparent;
  color: #aaa;
  border: 2px solid #444;
}

.popup-btn.primary:hover {
  border: 3px solid rgb(112, 43, 43);
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(195, 65, 65, 1);
  background: rgb(180, 55, 55);
  transform: scale(1.05);
}

.popup-btn.secondary:hover {
  border: 3px solid rgb(112, 43, 43);
  box-shadow: 0 0 15px rgba(195, 65, 65, 0.6);
  color: #fff;
  transform: scale(1.02);
}

@media(max-width: 450px){
  .popup-box{
    width: 90%;
    padding: 20px;
  }

  .popup-title{
    font-size: 2.8rem;
  }

  .popup-text{
    font-size: 1.4rem;
  }

  .popup-btn{
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 1.3rem;
    margin-right: 20px;
    margin-left: 20px;
  }
}
`;
