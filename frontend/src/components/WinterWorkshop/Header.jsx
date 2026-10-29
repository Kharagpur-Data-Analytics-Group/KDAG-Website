import React from "react";
import styled from "styled-components";
import analytics7 from "./../../assets/pics/analytics7.jpg";

const WwListHeader = styled.div`
  background: linear-gradient(
      0deg,
      rgba(220, 66, 66, 0.9),
      rgba(90, 5, 5, 1)
    ),
    url(${analytics7});
  height: 5rem;
  padding-top: 2rem;
  background-size: cover;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  .ww-list-header-title {
    font-family: Poppins, sans-serif;
    font-size: 4rem;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
  }

  .ww-list-header-subtitle {
    font-family: Poppins, sans-serif;
    font-size: 1rem;
    text-align: center;
    color: #ddd;
    width: 50%;
    margin: auto;
    min-width: 30rem;
  }
`;

const Header = () => {
  return (
    <WwListHeader>
      {/* <div className="ww-list-header-title">OUR TEAM</div>
      <div className="ww-list-header-subtitle">
      Meet our executive team- all of them being active members in bringing all ML/AI enthusiasts under the roof of Kharagpur Data Analytics Group!
      </div> */}
    </WwListHeader>
  );
};

export default Header;
