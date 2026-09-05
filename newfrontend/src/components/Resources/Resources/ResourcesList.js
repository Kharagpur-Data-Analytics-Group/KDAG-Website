import React from "react";
import "./ResourcesList.css";
import ResourcesCard from "./ResourcesCard";
import resources from "./ResourcesStatic";

const dummy = [0, 1, 2, 3, 4, 5, 6, 7];

const ResourcesList = () => {
  // To be used later
  // const [blogs, setBlogs] = useState();

  return (
    <div class="resources-list-cards">
      {resources?.map((resource) => {
        return <ResourcesCard key={resource.id} resource={resource} />;
      }) ||
        dummy.map((id) => {
          return <ResourcesCard key={id} />;
        })}
    </div>
  );
};

export default ResourcesList;
