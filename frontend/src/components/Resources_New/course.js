import React from "react";
import Particless from "../Common/Particles/Particless";
import "./course.css"; // Import your new CSS
import App from "./CourseApp"; // Import the CourseApp component

 const Course = () => {
  return (
    <>
      <Particless />
    <div className="course-container" style={{padding: "100px" }}>
        
    </div>
    <App/>
    </>
    )
};

export default Course;