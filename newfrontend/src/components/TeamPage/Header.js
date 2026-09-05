import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
      <div className={`resources-list-header ${isVisible ? "show" : ""}`}>
        <div class="resources-list-header-title">OUR TEAM</div>
        <div class="resources-list-header-subtitle" style={{ fontSize: "1.2rem" }}>
      Meet our executive team- all of them being active members in bringing all ML/AI enthusiasts under the roof of Kharagpur Data Analytics Group!
      </div>
    </div>
  );
};

export default Header;
