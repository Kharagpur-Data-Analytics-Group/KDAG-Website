import React from "react";
import Particless from "../Common/Particles/Particless";
import App from "./CourseApp.jsx"; // Import the CourseApp component

const Course = () => {
  return (
    <>
      <Particless />
      <div className="course-container"></div>
      <App />
    </>
  );
};

export default Course;
