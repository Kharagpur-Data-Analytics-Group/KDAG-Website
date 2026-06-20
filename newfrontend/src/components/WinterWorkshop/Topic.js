import React from "react";
import "./Topic.css";
import recording from "../../assets/pics/winterworkshop/recording.svg";
import TabHeading from "./TabHeading";

const TopicTab = (props) => {
  return (
    <>
      <TabHeading title="Topics" />
      <div className="winter-workshop-session-container">
        {props.sessions.map((e) => (
          <>
            <div className="winter-workshop-session-heading">
              <div className="winter-workshop-session-heading-in">
                <div className="winter-workshop-session-name">
                  Session {e.id}
                </div>
                <div className="winter-workshop-session-time"><span>{e.time}</span></div>
              </div>
              <div style={{display: "flex", flexWrap: "wrap"}}>

              <a style={{marginRight: "1rem"}} href={e.recordinglink} target="_blank" rel="noopener noreferrer">
                <div className="winter-workshop-session-recording">
                  <img
                    src={recording}
                    alt="recording"
                    className="recording-icon"
                  />
                  Recording
                </div>
              </a>
              <a href={e.presentation} target="_blank" rel="noopener noreferrer">
                <div className="winter-workshop-session-recording">
                  <i class="fab fa-google-drive"></i>&nbsp;
                  Presentation
                </div>
              </a>
              </div>
            </div>
            {/* {props.map} */}
            <Topic topics={e.topics} />
          </>
        ))}
      </div>
    </>
  );
};

export default TopicTab;

const Topic = (props) => {
  return props.topics.map((e) => (
    <div className="winter-workshop-topic-container">
      <div className="winter-workshop-topic-div">{e}</div>
    </div>
  ));
};
