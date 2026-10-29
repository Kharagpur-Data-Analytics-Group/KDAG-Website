import React, { useState, useEffect } from "react";
const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return <div className={`forum-page-header [opacity:0]! [transition:opacity_1s]! [padding:30px]! [padding-top:10rem]! [background-size:cover]! [box-shadow:0px_2px_10px_rgba(0,_0,_0,_0.25)]! [&.show]:[opacity:1]! ${isVisible ? "show" : ""} `}>
      <div className="forum-page-header-title [font-family:Poppins,_sans-serif]! [font-size:4rem]! [font-weight:700]! [text-align:center]! [color:#ffffff]!">DISCUSSION FORUM</div>
      <div className="forum-page-header-subtitle [font-family:Poppins,_sans-serif]! [text-align:center]! [color:#ddd]! [width:50%]! [margin:auto]! [min-width:30rem]! [&_a]:[text-decoration:underline]!" style={{
      fontSize: "1.2rem"
    }}>
        Please follow the{" "}
        <a href="/community-guidelines">Community Guidelines.</a>
      </div>
    </div>;
};
export default Header;
