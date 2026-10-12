import React from "react";
import { Link } from "react-router-dom";
import Fade from "../../Common/Motion/Fade.js";

import blogPic from "../../../assets/pics/Blogs.png";
import eventsPic from "../../../assets/pics/Events.png";
import resourcesPic from "../../../assets/pics/Resources.png";

const ContentText = ({ word, heading, children, extraClass = "" }) => (
  <div className={`content-pair-text${extraClass}`}>
    <div className={`content-pair-heading${extraClass}`}>
      <span className="content-pair-word">{word}</span>
      {heading}
    </div>
    <hr />
    <div className={`content-pair-paragraph${extraClass}`}>{children}</div>
  </div>
);

const BLOG_TEXT =
  "As we dive deeper into the world of Machine Learning everyday, it becomes imperative to stay up-to-date with the different machine learning algorithms that not only help us build our data models but also provide an in-depth understanding of data science. Plunge right in and happy learning!";
const RESOURCES_TEXT =
  "Every year KDAG conducts the Winter workshop for students of IIT KGP who are interested in the field of data analytics. From python basics to CNN, these modules have been meticulously curated to cover a spectrum of topics. KDAG also provides a planned preparation guide for interviews to help students with internship and placement drive";
const EVENTS_TEXT =
  "Data Science workshops, internship bootcamps, panel discussions on research internships opportunities in ML/AI , reading sessions , hackathons and what not! KDAG is pleased to bring it  forth to you to enhance your knowledge.You are just one click away from getting access to all of this! Go ahead and all the best!";

const Content = () => (
  <>
    <style>{contentStyles}</style>
    <div className="content-container">
      <Link to="/blogs" className="content-pair-link">
        <div className="content-pair">
          <Fade left>
            <ContentText
              word="BLOG"
              heading=" : Welcome to the pathway to master Data Science!"
            >
              {BLOG_TEXT}
            </ContentText>
          </Fade>
          <Fade right>
            <div className="content-pair-graphics">
              <img src={blogPic} alt="CONTENT GRAPHICS 1" />
            </div>
          </Fade>
        </div>
      </Link>

      {/* Text-first copy is shown on mobile, image-first copy on desktop */}
      <Link to="/resources" className="content-pair-link">
        <div className="content-pair">
          <Fade left>
            <div className="content-pair-text content-mobile">
              <div className="content-pair-heading">
                <span className="content-pair-word">RESOURCES</span> : Choose the path you like in machine learning by exploring our resource library!
              </div>
              <hr />
              <div className="content-pair-paragraph">{RESOURCES_TEXT}</div>
            </div>
          </Fade>
          <Fade right>
            <div className="content-pair-graphics content-mobile">
              <img src={resourcesPic} alt="CONTENT GRAPHICS 1" />
            </div>
          </Fade>
          <Fade left>
            <div className="content-pair-graphics content-nonmobile">
              <img src={resourcesPic} alt="CONTENT GRAPHICS 1" />
            </div>
          </Fade>
          <Fade right>
            <ContentText
              word="RESOURCES"
              heading=" : Choose the path you like in machine learning by exploring our resource library!"
              extraClass=" content-nonmobile"
            >
              {RESOURCES_TEXT}
            </ContentText>
          </Fade>
        </div>
      </Link>

      <Link to="/events" className="content-pair-link">
        <div className="content-pair">
          <Fade left>
            <ContentText
              word="EVENTS"
              heading=": Check out the plethora of events conducted by KDAG!"
            >
              {EVENTS_TEXT}
            </ContentText>
          </Fade>
          <Fade right>
            <div className="content-pair-graphics">
              <img src={eventsPic} alt="CONTENT GRAPHICS 1" />
            </div>
          </Fade>
        </div>
      </Link>
    </div>
  </>
);

// Kept as real CSS (same pattern as TeamPage.jsx): the hover-driven sibling
// effects, calc() underline transition and 800px breakpoint have no exact
// Tailwind tokens. Copied from Content.css (the Inter @import and `*` reset
// now live in src/legacy-globals.css).
const contentStyles = `
.content-container {
  margin: auto;
  width: 85%;
  max-width: 1200px;
  padding: 2rem 1rem;
  position: relative;
  z-index: 15;
}

.content-pair {
  display: flex;
  align-items: stretch;
  margin: 2rem 0;
  gap: 2.5rem;
  transition: transform 1s ease;
}

.content-pair:hover {
  transform: translateY(-5px);
}

.content-pair-text {
  flex: 1;
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.05);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.content-pair:hover .content-pair-text {
  background-color: rgba(104, 58, 58, 0.15);
  box-shadow: 0 0 20px rgba(250, 57, 70, 1);
}

.content-pair-heading {
  font-size: 1.7rem;
  font-weight: 700;
  color: white;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.content-pair-word {
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 1px;
  color: #fb8787;
  transition: all 0.3s ease;
}

.content-pair-word::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 3px;
  background-color: #ffb3b3;
  border-radius: 2px;
  transition: transform calc(0.1s * var(--word-length, 10)) ease;
  transform: scaleX(0);
  transform-origin: left;
}

.content-pair:hover .content-pair-word::after {
  transform: scaleX(1);
}

.content-pair:hover .content-pair-word {
  font-size: 2.1rem;
}

.content-pair-paragraph {
  color: #d2c9c9;
  line-height: 1.7;
  font-size: 1.15rem;
  font-weight: 400;
  transition: color 0.3s;
}

.content-pair:hover .content-pair-paragraph {
  color: #f5dada;
}

.content-pair-graphics {
  flex: 1;
  padding: 0px;
}

.content-pair-graphics img {
  max-height: 300px;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.content-pair:hover .content-pair-graphics img {
  border: 3px solid rgb(112, 43, 43);
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(195, 65, 65, 1);
}

.content-pair-link {
  text-decoration: none;
  color: inherit;
}

.content-mobile {
  display: none;
}

@media (max-width: 800px) {
  .content-pair-graphics {
    display: none;
  }

  .content-pair {
    flex-direction: column;
    gap: 1.5rem;
  }

  .content-pair-text {
    width: 100%;
    padding: 20px;
  }

  .content-pair-word {
    font-size: 1.6rem;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
  }

  .content-pair:hover .content-pair-word {
    font-size: 1.7rem;
  }
}
`;

export default Content;
