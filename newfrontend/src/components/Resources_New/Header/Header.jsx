import React, { useState, useEffect } from "react";
const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {}, 500);
    return () => clearTimeout(timer);
  }, []);
  return <div>
      <div className={`resources-list-header [height:30rem]! [padding-top:10rem]! [background-size:cover]! [box-shadow:0px_2px_10px_rgba(0,_0,_0,_0.25)]! [transition:opacity_1s]! [opacity:0]! [&.show]:[opacity:1]! ${isVisible ? "show" : ""} `}>
        <div className="resources-list-header-title [font-family:Poppins,_sans-serif]! [font-size:4rem]! [font-weight:700]! [text-align:center]! [color:#ffffff]!">ML SHEET</div>
        <div className="resources-list-header-subtitle [font-family:Poppins,_sans-serif]! [text-align:center]! [color:#ddd]! [width:50%]! [margin:auto]! [min-width:30rem]!" style={{
        fontSize: "1.15rem"
      }}>
          Confused about where to get started with Data Science and Analytics. Not getting hold of proper resources or roadmap? Hold on, here we bring a compilation of articles that touches the basics of Python to the mathematical models in Deep learning and AI. Campus junta, if want some “teeps and treeks” on the CDC intern in Analytics profile, you are at the right place!
        </div>
      </div>
    </div>;
};
export default Header;
