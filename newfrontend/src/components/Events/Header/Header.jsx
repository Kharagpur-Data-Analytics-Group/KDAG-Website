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
      <div className={`relative top-25 h-[30rem] !pt-[1rem] bg-cover shadow-[0_2px_10px_rgba(0,0,0,0.25)] transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div class="text-[4rem] font-bold text-center !text-white"
        style={{fontFamily : 'Poppins, sans-serif'}}>
          EVENTS
        </div>
        <div class="text-[1.2rem] text-center !text-[#ddd] w-[50%] !m-auto min-w-[30rem]" 
        style={{ fontFamily : 'Poppins, sans-serif' }}>
        Keeping up with our aim of bringing the fascinating world of Machine Learning and data analytics to the student community, we host a number of events in which contestants can not only compete but also learn and develop their talents. Here's to collaborative learning!
        </div>
      </div>
    </div>
  );
};

export default Header;
