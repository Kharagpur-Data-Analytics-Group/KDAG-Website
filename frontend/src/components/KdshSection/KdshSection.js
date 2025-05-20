import "./KdshSection.css";
import bgImg from "../../assets/Kdsh-bg.jpg";
import React from "react";
import Fade from "react-reveal/Fade";
const KdshSection = () => {
  return (
    <Fade bottom delay={200}>
      <div className="kdsh-section">
        <div
          className="kdsh-bg"
          // style={{
          //   backgroundImage: `url(${bgImg})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          //   padding: "60px 0",
          // }}
        >
          <div className="kdsh-container">
            <div className="kdsh-row">
              <div className="kdsh-main">
                <div className="kdsh-heading">
                  <h1><span className="kdsh-span">Kharagpur Data Science Hackathon </span>2025</h1>
                  <p>
                    KDSH Organized by the Kharagpur
                    Data Analytics Group (KDAG)  is a
                    national-level hackathon that brings together the brightest
                    minds to solve real-world problems using data science,
                    machine learning, and artificial intelligence. Known for its
                    innovation-driven challenges, industry partnerships, and
                    high-impact outcomes, KDSH is the ultimate platform for
                    aspiring data scientists to learn, compete, and shine.
                  </p>
                  <div className="kdsh-subcontainer">
                    <div className="feature-container">
                      <div className="kdsh-feature">
                        <div className="kdsh-icon">
                          <i className="fa fa-check"></i>
                        </div>
                        <span> ₹2.5 Lakh Prize Pool at Stake</span>
                      </div>
                      <div className="kdsh-feature">
                        <div className="kdsh-icon">
                          <i className="fa fa-check"></i>
                        </div>
                        <span>Asia’s Largest Data Science Competition</span>
                      </div>
                      <div className="kdsh-feature">
                        <div className="kdsh-icon">
                          <i className="fa fa-check"></i>
                        </div>
                        <span>
                        Collaborations with Top Companies in Tech and
      Analytics
                        </span>
                      </div>
                    </div>

                    <div className="kdsh-stats">
                      <div className="kdsh-stat-item">
                        <h2 data-toggle="counter-up">5000+</h2>
                        <p>Participants</p>
                      </div>
                      <div className="kdsh-stat-item">
                        <h2 data-toggle="counter-up">40+</h2>
                        <p> Teams</p>
                      </div>
                      <div className="kdsh-stat-item">
                        <h2 data-toggle="counter-up">₹2.5 Lakh</h2>
                        <p>Cash Prize</p>
                      </div>
                      <div className="kdsh-stat-item">
                        <h2 data-toggle="counter-up">200+</h2>
                        <p>Institutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default KdshSection;
