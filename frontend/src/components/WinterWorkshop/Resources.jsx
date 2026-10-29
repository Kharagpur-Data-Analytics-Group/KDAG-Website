import React from "react";
import styled from "styled-components";
import ResourcesCard from "./ResourcesCard.jsx";
import TabHeading from "./TabHeading.jsx";

const ResourcesContainer = styled.div`
  padding: 1.5rem;

  .winter-workshop-blogs-head {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .winter-workshop-container {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Resources = (props) => {
  return (
    <>
      <TabHeading title="Resources" />
      <ResourcesContainer>
        <div className="winter-workshop-blogs-head">
          <span>Blogs</span>
        </div>
        <div className="winter-workshop-container">
          {props.blogs.map((e, index) => (
            <ResourcesCard key={index} {...e} color="#407BFFB2" />
          ))}
        </div>
        <div className="winter-workshop-blogs-head">
          <span>Videos</span>
        </div>
        <div className="winter-workshop-container">
          {props.videos.map((e, index) => (
            <ResourcesCard key={index} {...e} color="#80B46EB2" />
          ))}
        </div>
      </ResourcesContainer>
    </>
  );
};

export default Resources;
