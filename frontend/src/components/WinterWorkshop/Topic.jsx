import React from "react";
import styled from "styled-components";
import recording from "../../assets/pics/winterworkshop/recording.svg";
import TabHeading from "./TabHeading.jsx";

const SessionContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 3rem;

  .winter-workshop-session-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin: 4px 0px 6px 0px;
    flex-wrap: wrap;
  }

  .winter-workshop-session-heading-in {
    display: flex;
    flex-wrap: wrap;
  }

  .winter-workshop-session-name {
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.25rem;
    color: #000000;
  }

  .winter-workshop-session-time {
    margin-left: 0.5rem;
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    color: #4a4a4a;
    display: flex;
    align-items: center;
  }

  .winter-workshop-session-recording {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0px;
    border-radius: 0.5rem;
    background-color: #407bff;
    border: none;
    color: white;
    text-decoration: none;
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: 500;
    padding: 1rem;
    font-size: 1.125rem;
    flex-grow: 1;
    flex-basis: 0;
    flex-shrink: 1;
    margin-bottom: 1rem;
  }

  .recording-icon {
    margin-right: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
  }

  .winter-workshop-topic-container {
    align-items: center;
    background-color: #f4f4f4;
    border-radius: 0.5rem;
    display: flex;
    height: 3.125rem;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 1rem;  
  }

  .winter-workshop-topic-div {
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 1.125rem;
    margin-left: 1.125rem;
    min-height: 1.75rem;
    width: 100%;
  }
`;

const TopicTab = (props) => {
  return (
    <>
      <TabHeading title="Topics" />
      <SessionContainer>
        {props.sessions.map((e) => (
          <React.Fragment key={e.id}>
            <div className="winter-workshop-session-heading">
              <div className="winter-workshop-session-heading-in">
                <div className="winter-workshop-session-name">
                  Session {e.id}
                </div>
                <div className="winter-workshop-session-time">
                  <span>{e.time}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <a
                  style={{ marginRight: "1rem" }}
                  href={e.recordinglink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="winter-workshop-session-recording">
                    <img
                      src={recording}
                      alt="recording"
                      className="recording-icon"
                    />
                    Recording
                  </div>
                </a>
                <a
                  href={e.presentation}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="winter-workshop-session-recording">
                    <i className="fab fa-google-drive"></i>&nbsp; Presentation
                  </div>
                </a>
              </div>
            </div>
            <Topic topics={e.topics} />
          </React.Fragment>
        ))}
      </SessionContainer>
    </>
  );
};

export default TopicTab;

const Topic = (props) => {
  return props.topics.map((e, index) => (
    <div className="winter-workshop-topic-container" key={index}>
      <div className="winter-workshop-topic-div">{e}</div>
    </div>
  ));
};
