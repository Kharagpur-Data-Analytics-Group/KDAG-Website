import React from "react";
import styled from "styled-components";
import TabHeading from "./TabHeading.jsx";

const TasksContainer = styled.div`
  margin-top: 1rem;
`;

const TaskLink = styled.a`
  text-decoration: none;
  
  .task-item {
    font-size: 1.2rem;
    color: #777;
    padding: 1rem;
    box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
    max-width: 30rem;
    border-radius: 10px;
    margin-left: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }
`;

const Tasks = (props) => {
  return (
    <div>
      <TabHeading title="Tasks" />
      <TasksContainer>
        {props.tasks && props.tasks.length > 0 ? (
          props.tasks.map((e, index) => (
            <TaskLink
              key={index}
              href={e.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="task-item">
                {e.name} <i className="fas fa-external-link-alt"></i>
              </p>
            </TaskLink>
          ))
        ) : (
          <div style={{ marginLeft: "1rem", color: "#777" }}>No Tasks</div>
        )}
      </TasksContainer>
    </div>
  );
};

export default Tasks;
