import React from "react";
import "./SponsorsSection.css";

import pathwayLogo from "./../../../assets/Pathway.png";
import academicInsightsLogo from "./../../../assets/AcademicInsights.png";
import youthIncLogo from "./../../../assets/YouthIncorporated.png";
import trueFoundryLogo from "./../../../assets/TrueFoundry.png";

const items = [
  { img: pathwayLogo, text: "Title Sponsor", website: "https://pathway.com" },
  { img: trueFoundryLogo, text: "Tech Platform Sponsor", website: "https://truefoundry.com" },
  { img: academicInsightsLogo, text: "Media Partner", website: "https://theacademicinsights.com" },
  { img: youthIncLogo, text: "Youth Media Partner", website: "https://youthincmag.com/" },
];

const Marquee = () => {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <a
            className="marquee-item"
            key={i}
            href={item.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.text}
          >
            <img src={item.img} alt={item.text} />
            <span>{item.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default function SponsorsSection() {
  return (
    <div className="container-hehehe">
      <div className="heading-hehehe">
        <h1>
          <span className="red">Kharagpur Data <br/> Science Hackathon</span> <span className="white">2026</span>
        </h1>
      </div>

      <Marquee />
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
