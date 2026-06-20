import React from "react";

import "./Resources.css";

const ResourcesCard = (props) => {
  return (
    <div className="winter-workshop-blog-box" style={{backgroundColor: props.color}}>
      <p className="winter-workshop-blog-head-topic">{props.heading}</p>
      <p className="winter-workshop-blog-topic">{props.topic}</p>
      <p className="winter-workshop-read-now"><a href={props.link} target="_blank" rel="noopener noreferrer">View</a></p>
    </div>
  );
};

export default ResourcesCard;
