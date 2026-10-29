import React, { useState, useEffect } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex flex-col"
      style={{
        height: "30rem",
        paddingTop: "10rem",
        backgroundSize: "cover",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1s",
      }}
    >
      <div
        className="font-bold text-center"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "3.75rem",
          color: "#ffffff",
        }}
      >
        OUR TEAM
      </div>
      <div
        className="text-center mx-auto"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "1.39rem",
          color: "#ddd",
          width: "50%",
          minWidth: "30rem",
        }}
      >
        Meet our executive team- all of them being active members in bringing all ML/AI enthusiasts under the roof of Kharagpur Data Analytics Group!
      </div>
    </div>
  );
};

export default Header;
