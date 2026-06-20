import React from "react";
import "./Header.css";
import KDSH2022 from "../../../../assets/pics/events/KDSH2022_Latest.png"

const Header = () => {
  return (
    <>
      <div className="resources-list-header">
        <div class="resources-list-header-title">Kharagpur <span className="bolding"> Data Science</span> Hackathon 2022</div>
      </div>
      <section className="banner-KDSH">
        <a href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463" target="_blank" className="banner-img">
          <img src={KDSH2022} height="450" width="700"></img>
        </a>
        <div className="banner-button">
          <a href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463" target="_blank" className="register">
              <span>Register</span>
              <div className="liquid"></div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Header;