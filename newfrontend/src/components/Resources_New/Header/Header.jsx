import React, { useState, useEffect } from "react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className={`h-120 !pt-40 bg-cover shadow-[0_2px_10px_rgba(0, 0, 0, 0.25)] duration-1000 ${isVisible ? "show" : ""}`}>
        <div className="text-[4rem] font-bold text-center !text-white">ML SHEET</div>
        <div className="text-[1.2rem] text-center w-1/2 !m-auto min-w-120" style={{ fontSize: "1.15rem", fontFamily : 'Poppins, sans-serif', color : '#ddd' }}>
          Confused about where to get started with Data Science and Analytics. Not getting hold of proper resources or roadmap? Hold on, here we bring a compilation of articles that touches the basics of Python to the mathematical models in Deep learning and AI. Campus junta, if want some “teeps and treeks” on the CDC intern in Analytics profile, you are at the right place!
        </div>
      </div>
    </div>
  );
};

export default Header;
