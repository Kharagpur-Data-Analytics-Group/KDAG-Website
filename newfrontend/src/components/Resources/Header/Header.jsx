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
    <div>
      <div className={`relative top-30 h-[30rem] pt-[10rem] bg-cover shadow-[0px_2px_10px_rgba(0,0,0,0.25)] transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="font-[Poppins,sans-serif] text-[4rem] font-bold text-center text-[#ffffff]">RESOURCES</div>
        <div className="font-[Poppins,sans-serif] text-[1.2rem] text-center text-[#ddd] w-1/2 m-auto min-w-[30rem]"
        style={{fontFamily : 'Segoe UI', fontSize: '1.3rem'}}>
          Confused about where to get started with Data Science and Analytics. Not getting hold of proper resources or roadmap? Hold on, here we bring a compilation of articles that touches the basics of Python to the mathematical models in Deep learning and AI. Campus junta, if want some “teeps and treeks” on the CDC intern in Analytics profile, you are at the right place!
        </div>
      </div>
    </div>
  );
};

export default Header;
