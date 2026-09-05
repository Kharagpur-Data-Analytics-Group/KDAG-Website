import React, { useState, useEffect } from "react";
import Header from "./Header";
import Particless from "../../../Common/Particles/Particless";
import './KDSH2022.css'
import CountUp from 'react-countup'
import Testimonials from './Testimonials'
import PastHackathons from './PastHackathons'
import logo from '../../../../assets/pics/events/Axtria_Logo.png'

const KDSH2022 = () => {
  let valueDisplays = ["425", "16", "70000", "2"];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
      />
      <Header />
      <div className="wrapper">
        <div className="container-1">
          <i className="fas fa-sharp fa-solid fa-graduation-cap counter" />
          <span className="num">
            <CountUp
              start={0}
              end={valueDisplays[0]}
              duration={4}
              separator=" "
              decimals={0}
              delay={0}
              enableScrollSpy={true}
              suffix={"+"}
            >
            </CountUp>
          </span>
          <span className="text">Colleges Reached</span>
        </div>
        <div className="container-1">
          <i className="fas fa-regular fa-calendar-days counter" />
          <span className="num">
            <CountUp
              start={0}
              end={valueDisplays[1]}
              duration={4}
              separator=" "
              decimals={0}
              delay={0}
              enableScrollSpy={true}
              suffix={"th Dec"}
            >
            </CountUp>
          </span>
          <span className="text">Deadline</span>
        </div>
        <div className="container-1">
          <i className="fas fa-sharp fa-solid fa-indian-rupee-sign counter" />
          <span className="num">
            <CountUp
              start={0}
              end={valueDisplays[2]}
              duration={4}
              separator=" "
              decimals={0}
              delay={0}
              enableScrollSpy={true}
              suffix={"+"}
            >
            </CountUp>
          </span>
          <span className="text">Prize Money</span>
        </div>
        <div className="container-1">
          <i className="fas fa-solid fa-laptop counter" />
          <span className="num">
            <CountUp
              start={0}
              end={valueDisplays[3]}
              duration={4}
              separator=" "
              decimals={0}
              delay={0}
              enableScrollSpy={true}
            >
            </CountUp>
          </span>
          <span className="text">Webinars</span>
        </div>
      </div>
      <div className="sponsor">
        <h1>Know about our sponsor</h1>
        <div className="about_img">
          <a href="https://www.axtria.com" target="_blank">
            <img src={logo} alt="axtria-logo" height="130" />
          </a>
        </div>
        <p className="about_sponsor">Axtria is a global provider of award-winning cloud software and data analytics to the life sciences industry. Axtria’s solutions are used to digitally transform the entire product commercialization process, driving sales growth, and improving healthcare outcomes for patients. Our focus is on delivering solutions that help customers complete the journey from Data-to-Insights-to-Action and get superior returns from their sales and marketing investments. For more information, visit <a href="https://www.axtria.com" target="_blank">www.axtria.com</a> .</p>
      </div>
      <div className="testimonial">
        <h1>Testimonials</h1>
        <Testimonials />
      </div>
      <div className="past-hackathons">
        <h1>Past Hackathons</h1>
        <PastHackathons />
      </div>
      <br /><br /><br />
      <Particless />
    </>
  );
};

export default KDSH2022;