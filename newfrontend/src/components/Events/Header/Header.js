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
    <div>
      <div className={`resources-list-header ${isVisible ? "show" : ""}`}>
        <div class="resources-list-header-title">EVENTS</div>
        <div class="resources-list-header-subtitle" style={{ fontSize: "1.15rem" }}>
        Keeping up with our aim of bringing the fascinating world of Machine Learning and data analytics to the student community, we host a number of events in which contestants can not only compete but also learn and develop their talents. Here's to collaborative learning!
        </div>
      </div>
    </div>
  );
};

export default Header;
