import React from "react";
import styled from "styled-components";

const TabTitleContainer = styled.div`
  align-items: center;
  display: flex;
  height: 3rem;
  min-width: 7rem;
  padding: 0 0px;
  position: relative;

  .winter-workshop-title {
    letter-spacing: 0;
    margin-left: 1.25rem;
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.25rem;
  }

  .winter-workshop-blue-box {
    height: 3rem;
    width: 1.5rem;
    background-color: #407bff;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

const TabHeading = (props) => {
  return (
    <TabTitleContainer>
      <span className="winter-workshop-blue-box"></span>
      <h1 className="winter-workshop-title">{props.title}</h1>
    </TabTitleContainer>
  );
};

export default TabHeading;
