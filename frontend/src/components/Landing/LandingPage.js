import React from "react";
// import EventCount from "./countdown/count";
import "./LandingPage.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SponsorSlider.css";
import kdag_about_us from "../../assets/KDAG_About_Us.png";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Poster from "../../assets/pics/events/KDAG ML Digest.jpg";
import { Typewriter } from "react-simple-typewriter";
// import KDSH5thEdition from "../../assets/pics/events/KDSH 5TH edition.jpg";

//Components
import Content from "./Content/Content.js";
import Fade from "react-reveal/Fade";
import Particless from "../Common/Particles/Particless";
// import video1 from "./Video/final.mp4";
// import Header from "./Header/Header";
// import associate_sponsor from "./../../assets/kdsh2025_associate_sponsor.jpg";
// import kdsh2025_logo from "../../assets/kdsh2025_logo.png"; // Adjust path as needed
import KdshSection from "../KdshSection/KdshSection.js";

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
    <>
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
                  Let's dive into{' '}
                  <span className="red typewriter-text" >
                    <Typewriter
                      words={['Data Analytics', 'Machine Learning']}
                      loop={0}
                      cursor
                      cursorStyle="|"
                      typeSpeed={100}
                      deleteSpeed={60}
                      delaySpeed={2000}
                    />
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* New Intro Blog Section */}
      <section className="introblog-section">
        <Fade bottom delay={200}>
          <div className="introblog-content-wrapper">
            <div className="introblog-content-flex">
              <img className="introblog-poster" src={Poster} alt="Poster" />
              <div className="introblog-content">
                <p>
                  We are excited to announce our collaboration with{" "}
                  <strong>Chi SquareX</strong>, one of India's top deep-tech
                  startups specializing in data science, machine learning, and
                  AI. Together, we're launching <strong>'ML Digest'</strong>, a
                  blog series dedicated to bringing you the latest advancements,
                  trends, and insights in machine learning and deep technology.
                  <br />
                  Starting on August 9th, this series will feature in-depth
                  articles, expert analyses, and cutting-edge research designed
                  to keep you informed and inspired by the industry's best. Stay
                  tuned for regular updates and get ready to explore the future
                  of technology with 'ML Digest.' Follow us and be part of the
                  innovation wave!
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </section>

      {/* content section  */}
      <section className="section-contents">
        {/* <Fade bottom>
        <div className="Hackathon-button">
          <div className="Hackathon-button-button"><a href="http://tinyurl.com/kdshreg" target="_blank" rel="noreferrer noopener">Register for Kharagpur Data Science Hackathon</a></div>
        </div>
        </Fade> */}

        <div className="about-kdag-wrapper">
          <div className="about-kdag">
            {/* <Fade left> */}
            {/* <div className="about-kdag-image">
          <img src={logo} alt="LOGO" />
        </div> */}
            {/* </Fade> */}

            {/* <Fade right>
							<div className="about-kdag-text">
								<h1 className="heading-about-kdag">About Us</h1>
								<hr className="rule-about-kdag" />
								<i>
									"KDAG is aimed at bringing Data Analytics and Machine Learning
									enthusiasts together under the umbrella of a single society,
									and provide ample opportunities & resources that are required
									to build a successful career in this emerging domain."
								</i>
							</div>
						</Fade> */}
            <div className="left-about-us">
              <Fade bottom>
                <img src={kdag_about_us} alt="img" className="img-about-us" />
              </Fade>
            </div>
            <div className="right-about-us">
              <Fade bottom delay={200}>
                <h1 className="heading-about-kdag">About Us</h1>
              </Fade>
              <Fade bottom delay={400}>
                <p className="about-kdag-text">
                  Kharagpur Data Analytics Group (KDAG) is a student-driven
                  initiative dedicated to uniting enthusiasts of Data Analytics,
                  Machine Learning, and Artificial Intelligence at IIT
                  Kharagpur. Our goal is to create a thriving community where
                  students can explore, learn, and grow in this rapidly evolving
                  field. We aim to bridge the gap between academic knowledge and
                  industry demands by offering hands-on projects, mentorship,
                  workshops, and speaker sessions with experts from academia and
                  industry.At KDAG, we believe that the future belongs to those
                  who can harness the power of data — and we are committed to
                  empowering the next generation of data-driven thinkers and
                  innovators.
                </p>
              </Fade>
            </div>
          </div>
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
    </>
  );
};

export default LandingPage;
