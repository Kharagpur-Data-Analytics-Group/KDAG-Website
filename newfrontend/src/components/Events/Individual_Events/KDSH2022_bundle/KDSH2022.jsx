import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Particless from "../../../Common/Particles/Particless";
import CountUp from 'react-countup'
import Testimonials from './Testimonials.jsx'
import PastHackathons from './PastHackathons.jsx'
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
      <div className="relative w-[80vw] -translate-[50%] top-[50%] left-[50%] flex justify-around gap-[10px] !mt-[200px] max-[480px]:gap-[15px] max-[480px]:!-mb-[150px] max-md:w-[90vw] max-md:flex-wrap max-md:gap-[30px] max-[1024px]:w-[85vw] max-[1024px]:!mt-[300px]">

        <div className="w-[28vmin] h-[28vmin] flex flex-col justify-around py-[1em]! relative text-[16px] rounded-[0.5em] bg-[#21242b] max-[1024px]:h-[26vmin] max-[1024px]:w-[26vmin] max-[1024px]:text-[12px] max-md:w-[calc(50% - 40px)] max-md:h-[30vmin] max-md:text-[14px] max-[480px]:h-[25vmin] max-[480px]:w-full max-[480px]:text-[8px]">

          <i className="fas fa-sharp fa-solid fa-graduation-cap text-[#18f98f]! text-[2.5em] text-center" />
          <span className="text-white! grid font-semibold text-[3em] place-items-center"
          style={{fontFamily : 'Segoe UI'}}>
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
          <span className="text-[#e0e0e0]! text-[1em] text-center py-[0.7em]! font-normal leading-0 max-[480px]:text-[2em]">
            Colleges Reached
          </span>
        </div>
        <div className="w-[28vmin] h-[28vmin] flex flex-col justify-around py-[1em]! relative text-[16px] rounded-[0.5em] bg-[#21242b] max-[1024px]:h-[26vmin] max-[1024px]:w-[26vmin] max-[1024px]:text-[12px] max-md:w-[calc(50% - 40px)] max-md:h-[30vmin] max-md:text-[14px] max-[480px]:h-[25vmin] max-[480px]:w-full max-[480px]:text-[8px">
          <i className="fas fa-regular fa-calendar-days text-[#18f98f]! text-[2.5em] text-center" />
          <span className="text-white! grid font-semibold text-[3em] place-items-center"
          style={{fontFamily : 'Segoe UI'}}>
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
          <span className="text-[#e0e0e0]! text-[1em] text-center py-[0.7em]! font-normal leading-0 max-[480px]:text-[2em]">
            Deadline
          </span>
        </div>
        <div className="w-[28vmin] h-[28vmin] flex flex-col justify-around py-[1em]! relative text-[16px] rounded-[0.5em] bg-[#21242b] max-[1024px]:h-[26vmin] max-[1024px]:w-[26vmin] max-[1024px]:text-[12px] max-md:w-[calc(50% - 40px)] max-md:h-[30vmin] max-md:text-[14px] max-[480px]:h-[25vmin] max-[480px]:w-full max-[480px]:text-[8px">
          <i className="fas fa-sharp fa-solid fa-indian-rupee-sign text-[#18f98f]! text-[2.5em] text-center" />
          <span className="text-white! grid font-semibold text-[3em] place-items-center"
          style={{fontFamily : 'Segoe UI'}}>
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
          <span className="text-[#e0e0e0]! text-[1em] text-center py-[0.7em]! font-normal leading-0 max-[480px]:text-[2em]">
            Prize Money
          </span>
        </div>
        <div className="w-[28vmin] h-[28vmin] flex flex-col justify-around py-[1em]! relative text-[16px] rounded-[0.5em] bg-[#21242b] max-[1024px]:h-[26vmin] max-[1024px]:w-[26vmin] max-[1024px]:text-[12px] max-md:w-[calc(50% - 40px)] max-md:h-[30vmin] max-md:text-[14px] max-[480px]:h-[25vmin] max-[480px]:w-full max-[480px]:text-[8px">
          <i className="fas fa-solid fa-laptop text-[#18f98f]! text-[2.5em] text-center" />
          <span className="text-white! grid font-semibold text-[3em] place-items-center"
          style={{fontFamily : 'Segoe UI'}}>
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
          <span className="text-[#e0e0e0]! text-[1em] text-center py-[0.7em]! font-normal leading-0 max-[480px]:text-[2em]">
            Webinars
          </span>
        </div>
      </div>

      <div className="relative max-[480px]:mb-[100px]!">
        <h1 className="text-white text-[2.5rem]! z-10 text-center max-[480px]:text-[45px]">
          Know about our sponsor
        </h1>
        <div className="flex justify-center">
          <a href="https://www.axtria.com" target="_blank">
            <img src={logo} alt="axtria-logo" height="130" className="h-[130px]" />
          </a>
        </div>
        <p className="text-white! px-[4rem]! text-[25px] leading-[30px] max-[480px]:text-[20px]!"
        style={{fontFamily : 'Serif, sans-serif'}}>
          Axtria is a global provider of award-winning cloud software and data analytics to the life sciences industry. Axtria’s solutions are used to digitally transform the entire product commercialization process, driving sales growth, and improving healthcare outcomes for patients. Our focus is on delivering solutions that help customers complete the journey from Data-to-Insights-to-Action and get superior returns from their sales and marketing investments. For more information, visit 
          <a href="https://www.axtria.com" target="_blank"
          className="text-red-500 hover:text-[rgba(255,0,0,0.5)]">
            www.axtria.com
          </a> .
        </p>
      </div>
      <div className="mt-[180px]!">
        <h1
        className="text-white! text-[2.5rem]! z-10 text-center"
        style={{fontFamily : 'Segoe UI'}}>
          Testimonials
        </h1>
        <Testimonials />
      </div>
      <div className="past-hackathons">
        <h1
        className="text-white! text-[2.5rem]! font-bold z-10 text-center"
        style={{fontFamily : 'Segoe UI'}}>
          Past Hackathons
        </h1>
        <PastHackathons />
      </div>
      <br /><br /><br />
      <Particless />
    </>
  );
};

export default KDSH2022;