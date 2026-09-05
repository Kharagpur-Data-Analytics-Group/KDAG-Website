import React from "react";
import TabHeading from "./TabHeading";

const Tasks = (props) => {
  return (
    <div>
      <TabHeading title="Tasks" />
      <div style={{ marginTop: "1rem" }}>
        {props.tasks.length > 0
          ? props.tasks.map((e) => (
              <a href={e.link} target="_blank" rel="noopener noreferrer">
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#777",
                    padding: "1rem",
                    boxShadow: "1px 1px 10px 1px rgba(0, 0, 0, 0.2",
                    maxWidth: "30rem",
                    borderRadius: "10px",
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  {e.name} <i class="fas fa-external-link-alt"></i>
                </p>
              </a>
            ))
          : "No Tasks"}
      </div>
    </div>
  );
};

export default Tasks;
