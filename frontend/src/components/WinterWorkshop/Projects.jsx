import React from "react";
import styled from "styled-components";
import TabHeading from "./TabHeading.jsx";

const ProjectsContainer = styled.div`
  margin-top: 1rem;
`;

const ProjectCard = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  max-width: 30rem;
  padding: 1rem;
  border-radius: 10px;

  .project-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .project-title {
    font-weight: bold;
  }

  .project-links a:first-child {
    margin: 1rem;
  }
`;

const Projects = (props) => {
  return (
    <div>
      <TabHeading title="Projects" />
      <ProjectsContainer>
        {props.projectlist.map((e, index) => (
          <ProjectCard key={index}>
            <div className="project-header">
              <div className="project-title">{e.heading}</div>
              <div className="project-links">
                <a href={e.githublink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href={e.drivelink} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-google-drive"></i>
                </a>
              </div>
            </div>
            <div>{e.description}</div>
          </ProjectCard>
        ))}
      </ProjectsContainer>
    </div>
  );
};

export default Projects;
