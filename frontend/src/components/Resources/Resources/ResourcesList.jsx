import React from "react";
import ResourcesCard from "./ResourcesCard";
import resources from "./ResourcesStatic";
const dummy = [0, 1, 2, 3, 4, 5, 6, 7];
const ResourcesList = () => {
  // To be used later
  // const [blogs, setBlogs] = useState();

  return <div className="resources-list-cards [display:flex]! [padding:3rem]! [padding-top:0]! [flex-wrap:wrap]! [justify-content:center]!">
      {resources?.map(resource => {
      return <ResourcesCard key={resource.id} resource={resource} />;
    }) || dummy.map(id => {
      return <ResourcesCard key={id} />;
    })}
    </div>;
};
export default ResourcesList;
