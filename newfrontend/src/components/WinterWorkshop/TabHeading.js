import React from "react";
import "./TabHeading.css";

const TabHeading = (props) => {
  return (
    <div className="winter-workshop-tab-title">
      <span className="winter-workshop-blue-box"></span>
      <h1 className="winter-workshop-title">{props.title}</h1>
    </div>
  );
};

export default TabHeading;
