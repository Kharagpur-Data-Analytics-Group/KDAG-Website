import React from "react";
import "./ResourcesCard.css";
import Fade from "../../Common/Motion/Fade.js"
// import dataAnalysis from "./../../../assets/pics/dataanlysis_nyc.png";

const ResourcesCard = ({ resource }) => {
  return (
    <div class="resources-list-card-wrapper">
<Fade bottom>
    <div className="resources-list-card">
      <div className="resources-list-card-contain">
      <div className="resources-list-card-left">
        <div className="resources-list-card-icon">
        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="24.5938" width="7.25" height="15.4062" fill="#F53D3D"/>
        <rect x="21.0625" y="18.25" width="7.25" height="21.75" fill="#F53D3D"/>
        <rect x="30.125" y="11" width="7.25" height="29" fill="#F53D3D"/>
        <circle cx="25.5" cy="25.5" r="24.5" stroke="#F53D3D" stroke-width="2"/>
        </svg>
        </div>
      </div>
      <div className="resources-list-card-right">
        <div className="resources-list-card-title">{resource.name}</div>
        <div className="resources-list-card-subtitle">{resource.subtitle}</div>
        
      </div>
      </div>
      <div className="resources-list-card-description">{resource.description}</div>
      <div className="resources-list-card-button-outerMost"><a href={resource.link} target="_blank" rel="noreferrer noopener"><div className="resources-list-card-button">View Resource</div></a></div>
    
    </div>

</Fade>
    </div>
  );
};

export default ResourcesCard;
