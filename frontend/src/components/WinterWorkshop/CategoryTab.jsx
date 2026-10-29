import React from "react";
import Topics from "./Topic.jsx";
import Projects from "./Projects.jsx";
import Resources from "./Resources.jsx";
import Tasks from "./Tasks.jsx";

const CategoryTab = (props) => {
  return (
    props.category.title === "Topics" ?
    <Topics {...props.category } /> : props.category.title === "Projects" ?
    <Projects {...props.category } /> : props.category.title === "Resources" ?
    <Resources {...props.category } /> :
    <Tasks {...props.category } />
  );
};

export default CategoryTab;
