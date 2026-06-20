import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className={`resources-list-header ${isVisible ? "show" : ""}`}>
        <div className="resources-list-header-title">ML SHEET</div>
        <div className="resources-list-header-subtitle" style={{ fontSize: "1.15rem" }}>
          Confused about where to get started with Data Science and Analytics. Not getting hold of proper resources or roadmap? Hold on, here we bring a compilation of articles that touches the basics of Python to the mathematical models in Deep learning and AI. Campus junta, if want some “teeps and treeks” on the CDC intern in Analytics profile, you are at the right place!
        </div>
      </div>
    </div>
  );
};

export default Header;
