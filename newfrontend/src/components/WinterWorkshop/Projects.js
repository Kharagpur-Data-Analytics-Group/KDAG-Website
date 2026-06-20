import React from "react";
import TabHeading from "./TabHeading";

const Projects = (props) => {
  return (
    <div>
    <TabHeading title="Projects" />
      <div style={{marginTop: "1rem"}}>
        {props.projectlist.map((e) => (
          <div
            style={{
              width: "100%",
              marginBottom: "1rem",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              maxWidth: "30rem",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{e.heading}</div>
              <div>
                <a style={{ margin: "1rem" }} href={e.githublink} target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-github"></i>
                </a>
                <a href={e.drivelink} target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-google-drive"></i>
                </a>
              </div>
            </div>
            <div>{e.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
