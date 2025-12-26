import React from "react";
// import EventCount from "./countdown/count";
import "./LandingPage.css";
import { useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SponsorSlider.css";
import kdag_about_us from "../../assets/KDAG_About_Us.png";
// import {
//   faCalendarDays,
//   faLocationDot,
// } from "@fortawesome/free-solid-svg-icons";
import Poster from "../../assets/pics/events/KDAG ML Digest.jpg";
import ThinkTank from "../../assets/ThinkTankImg.jpg";
import { Typewriter } from "react-simple-typewriter";

import Content from "./Content/Content.js";
import Fade from "../Common/Motion/Fade.js"
import Particless from "../Common/Particles/Particless";
// import video1 from "./Video/final.mp4";
// import Header from "./Header/Header";
// import associate_sponsor from "./../../assets/kdsh2025_associate_sponsor.jpg";
// import kdsh2025_logo from "../../assets/kdsh2025_logo.png"; // Adjust path as needed
import KdshSection from "./KdshSection/KdshSection.js";
import Message from "./Message.js"

const LandingPage = () => {

  // const handleTitleClick = () => {
  // 	window.open("https://pathway.com/", "_blank", "noopener,noreferrer");
  // };
  // const handleYouthInc = () => {
  // 	window.open("https://youthincmag.com/", "_blank", "noopener,noreferrer");
  // };
  // const handleDazeInfo = () => {
  // 	window.open("https://dazeinfo.com/", "_blank", "noopener,noreferrer");
  // };
  // const handleTheAca = () => {
  // 	window.open(
  // 		"https://theacademicinsights.com/",
  // 		"_blank",
  // 		"noopener,noreferrer"
  // 	);
  // };
  // const handleStock = () => {
  // 	window.open("https://stockedge.com/", "_blank", "noopener,noreferrer");
  // };

  return (
    <div className="Landing-Page-wrapper">
      {/* <Header />
        <a
        href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463"
        target="_blank"
        className="banner-video"
        >
        <video
        src={video1}
        height="600"
        width="auto"
        autoplay="true"
        muted
        loop
        ></video>
        </a> */}

      <section className="banner">
        <div className="banner-main">
          <div className="banner-heading-flex-container">
            <div className="banner-heading-flex">
              <div className="banner-heading">
                <div className="line">
                  <h3 >KHARAGPUR </h3>
                  <h3 class="red">DATA </h3>
                </div>
                <div className="line">
                  <h3 className="red">ANALYTICS</h3>
                  <h3 >GROUP</h3>
                </div>
                <h1 className="m-t170 fs2rem">
                  The {' '}
                  <span className="red typewriter-text" >
                    <Typewriter
                      words={['Data Analytics', 'Machine Learning']}
                      loop={0}
                      cursor
                      cursorStyle="|"
                      typeSpeed={100}
                      deleteSpeed={40}
                      delaySpeed={2000}
                    />
                  </span>
                  {' '} Society at IIT Kharagpur
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Message/> */}

      {/* New Intro Blog Section */}
      <section className="introblog-section">
        <Fade bottom delay={200}>

          <div className="introblog-content-wrapper">
            <div className="introblog-content-flex">
              <a href="https://drive.google.com/file/d/1fNMl2LZt6CwavyZ2PvOGWiNvrx3LXPtO/view" target="_blank" rel="noreferrer">
                <img className="introblog-poster" src={ThinkTank} alt="Poster" />
              </a>

              <div className="introblog-content">
                <a href="https://drive.google.com/file/d/1fNMl2LZt6CwavyZ2PvOGWiNvrx3LXPtO/view" target="_blank" rel="noreferrer">
                  <p>
                    Sharpen your analytical skills with <strong>CDC 101: Think Tank</strong> brought to you by the Kharagpur Data Analytics Group. This resource is designed to elevate your CDC placement and internship preparation with <strong>200+ logic puzzles and 120+ probability problems</strong> — many sourced from real interviews at top firms like <strong>Goldman Sachs, J.P. Morgan, and Morgan Stanley</strong>. Dive into topics like Bayes' Theorem, expectations, distributions, and classic challenges like the Monty Hall problem. With step-by-step solutions and varying difficulty levels, Think Tank is ideal for both beginners and advanced learners aiming for roles in software, finance, and quantitative fields.
                  </p>
                </a>

              </div>
            </div>
          </div>
        </Fade>
      </section>

      {/* content section  */}
      <section className="section-contents">

        <div className="about-kdag-wrapper">
          <Fade bottom>
          <div className="about-kdag">
            <div className="left-about-us">
                <img src={kdag_about_us} alt="img" className="img-about-us" />
            </div>
              <div className="right-about-us">

                <h1 className="heading-about-kdag">The Data Science and Machine Learning Society at IIT Kharagpur</h1>
                <p className="about-kdag-text">
                  Kharagpur Data Analytics Group (KDAG) is a student-driven
                  initiative dedicated to uniting enthusiasts of Data Analytics,
                  Machine Learning, and Artificial Intelligence at IIT
                  Kharagpur. Our goal is to create a thriving community where
                  students can explore, learn, and grow in this rapidly evolving
                  field. We aim to bridge the gap between academic knowledge and
                  industry demands by offering hands-on projects, mentorship,
                  workshops, and speaker sessions with experts from academia and
                  industry. At KDAG, we believe that the future belongs to those
                  who can harness the power of data — and we are committed to
                  empowering the next generation of data-driven thinkers and
                  innovators.
                </p>
              </div>
          </div>
          </Fade>
        </div>
        <div>
          <KdshSection />
        </div>

        <Content />
      </section>

      {/* Contact Section */}
      {/*<section className="section-contacts">
        <Contact />
      </section>*/}

      <Particless />
    </div>
  );
};

export default LandingPage;

{/* <div className="kdsh2025_header">
    Introducing Sponsors for KDSH 2025
  </div>

  <div className="kdsh2025_sponsors">
    <img src={associate_sponsor} alt="associate_sponsor" />
  </div> */}

{/* <div className="kdsh2025-sponsor-slider">
    <ul>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
    </ul>

    <ul aria-hidden="true">
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
      <li>
        <img src={associate_sponsor} alt="associate_sponsor" />
      </li>
    </ul>
  </div> */}