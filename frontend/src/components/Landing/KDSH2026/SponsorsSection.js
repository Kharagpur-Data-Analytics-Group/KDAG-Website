import React, { useEffect, useRef, useState } from "react";
import "./SponsorsSection.css";

import pathwayLogo from "./../../../assets/Pathway.png";
import academicInsightsLogo from "./../../../assets/AcademicInsights.png";
import youthIncLogo from "./../../../assets/YouthIncorporated.png";
import trueFoundryLogo from "./../../../assets/TrueFoundry.png";


const items = [
  { img: pathwayLogo, text: "Title Sponsor" },
  { img: trueFoundryLogo, text: "Tech Platform Sponsor" },
  { img: academicInsightsLogo, text: "Media Partner" },
  { img: youthIncLogo, text: "Youth Media Partner" },
  { img: pathwayLogo, text: "Title Sponsor" },
  { img: trueFoundryLogo, text: "Tech Platform Sponsor" },
  { img: academicInsightsLogo, text: "Media Partner" },
  { img: youthIncLogo, text: "Youth Media Partner" },
];

const Marquee = () => {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <div className="marquee-item" key={i}>
            <img src={item.img} alt={item.text} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SponsorsSection() {
  return (
    <div className="container-hehehe">
      <div className="heading-hehehe">
        <h1>
          KDSH <span className="white">2026</span>
        </h1>
        <h1 id="subheading">Our <span className="red">Sponsors</span>:</h1>
      </div>
      <Marquee/>
    </div>
  );
}


  const sponsors = {
    title: [
      {
        id: "pathway",
        name: "Pathway",
        logo: pathwayLogo,
        website: "https://pathway.com",
        description: "Real-time data processing and AI infrastructure",
      },
    ],
    platform: [
      {
        id: "truefoundry",
        name: "TrueFoundry",
        logo: trueFoundryLogo,
        website: "https://truefoundry.com",
        description: "ML infrastructure and deployment platform",
      },
    ],
    media: [
      {
        id: "academic-insights",
        name: "Academic Insights",
        logo: academicInsightsLogo,
        website: "https://theacademicinsights.com",
        description: "Educational content and research platform",
      },
      {
        id: "youth-inc",
        name: "Youth Incorporated",
        logo: youthIncLogo,
        website: "https://youthincmag.com/",
        description: "Youth empowerment and innovation media",
      },
    ],
  };
