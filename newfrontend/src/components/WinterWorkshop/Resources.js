import React from "react";
import ResourcesCard from "./ResourcesCard";
import TabHeading from "./TabHeading";

const Resources = (props) => {
  return (
    <>
    <TabHeading title="Resources" />
    <div className="winter-workshop-resources">
      <div className="winter-workshop-blogs-head">
        <span>Blogs</span>
      </div>
      <div className="winter-workshop-container">
        {props.blogs.map((e) => (
          <ResourcesCard {...e} color="#407BFFB2" />
        ))}
      </div>
      <div className="winter-workshop-blogs-head">
        <span>Videos</span>
      </div>
      <div className="winter-workshop-container">
        {props.videos.map((e) => (
          <ResourcesCard {...e} color="#80B46EB2" />
        ))}
      </div>
    </div>
    </>
  );
};

export default Resources;
