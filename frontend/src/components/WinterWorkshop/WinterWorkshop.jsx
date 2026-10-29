import React from "react";
import styled from "styled-components";
import data from "./data";
import workshopbanner from "../../assets/pics/winterworkshop/winterworkshop.svg";
import DayTabs from "./DayTabs.jsx";
import Navbar from "../Common/Navbar/Navbar";
import Header from "./Header.jsx";

const ContentContainer = styled.div`
  padding: 5rem;

  .winter-workshop-image {
    display: block;
    margin: auto;
  }
`;

const WinterWorkshop = () => {
  return (
    <div className="bg-white">
      <Navbar noborder />
      <Header />
      <ContentContainer>
        <img
          className="winter-workshop-image"
          src={workshopbanner}
          alt="Winter Workshop"
        />
        <DayTabs days={data} />
      </ContentContainer>
    </div>
  );
};

export default WinterWorkshop;
