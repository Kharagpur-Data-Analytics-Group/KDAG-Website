import React from "react";
import styled from "styled-components";

const BlogBox = styled.div`
  background-color: ${props => props.bgColor || "aquamarine"};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin: 1rem;
  color: white;
  box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.3);
  width: 20rem;

  .winter-workshop-blog-head-topic {
    font-size: 1.2rem; 
    color: white;
  }

  .winter-workshop-blog-topic {
    font-size: 0.8rem;
    margin-bottom: 2rem;
  }
`;

const ResourcesCard = (props) => {
  return (
    <BlogBox bgColor={props.color}>
      <p className="winter-workshop-blog-head-topic">{props.heading}</p>
      <p className="winter-workshop-blog-topic">{props.topic}</p>
      <p className="winter-workshop-read-now">
        <a href={props.link} target="_blank" rel="noopener noreferrer">View</a>
      </p>
    </BlogBox>
  );
};

export default ResourcesCard;
