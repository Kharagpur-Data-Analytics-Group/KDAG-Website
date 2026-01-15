import React from "react";
import "./SponsorsSection.css";

import pathwayLogo from "./../../../assets/KDSH2026_sponsor_logos/Pathway.png";
import academicInsightsLogo from "./../../../assets/KDSH2026_sponsor_logos/AcademicInsights.png";
import youthIncLogo from "./../../../assets/KDSH2026_sponsor_logos/YouthIncorporated.png";
import trueFoundryLogo from "./../../../assets/KDSH2026_sponsor_logos/TrueFoundry.png";
import tghLogo from "./../../../assets/KDSH2026_sponsor_logos/TGHLogo2.png";
import { Link, NavLink } from "react-router-dom";

const items = [
  { img: pathwayLogo, text: "Title Sponsor", website: "https://pathway.com" },
  { img: trueFoundryLogo, text: "Tech Platform Sponsor", website: "https://truefoundry.com" },
  { img: academicInsightsLogo, text: "Media Partner", website: "https://theacademicinsights.com" },
  { img: tghLogo, text: "Media Partner", website: "https://theglobalhues.com/"},
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
      <Link 
        className="register-button" 
        to="/certificate-generation"
      >
        Get Certificate
      </Link>
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
