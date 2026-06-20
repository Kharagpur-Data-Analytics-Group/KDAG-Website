import React from "react";
import data from "./data";
import workshopbanner from "../../assets/pics/winterworkshop/winterworkshop.svg";
import DayTabs from "./DayTabs";
import Navbar from "../Common/Navbar/Navbar";
import Header from "./Header"
import "./WinterWorkshop.css"

const WinterWorkshop = () => {
  return (
    <div>
      <Navbar noborder />
      <Header />
      <div style={{
        padding: "5rem"
      }}>
        <img
          className="winter-workshop-image"
          src={workshopbanner}
          alt="Winter Workshop"
          style={{display: "block", margin:  "auto"}}
        />
        <DayTabs days={data} />
      </div>
    </div>
  );
};

export default WinterWorkshop;
