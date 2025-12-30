import React, { useEffect, useRef, useState } from "react";
import "./SponsorsSection.css";

import pathwayLogo from "./../../../assets/Pathway.png";
import academicInsightsLogo from "./../../../assets/AcademicInsights.webp";
import youthIncLogo from "./../../../assets/YouthIncorporated.jpg";
import trueFoundryLogo from "./../../../assets/TrueFoundry.jpg";

const SponsorsSection = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = entry.target.getAttribute("data-card-id");
          setVisibleCards((prev) => new Set([...prev, cardId]));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

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
        website: "https://academicinsights.com",
        description: "Educational content and research platform",
      },
      {
        id: "youth-inc",
        name: "Youth Incorporated",
        logo: youthIncLogo,
        website: "https://youthincorporated.com",
        description: "Youth empowerment and innovation media",
      },
    ],
  };

  const handleCardClick = (website) => {
    window.open(website, "_blank", "noopener,noreferrer");
  };

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section className="sponsors-section" id="sponsors">
      <div className="sponsors-container">
        <h2 className="sponsors-title">Our Sponsors</h2>

        {/* Title Sponsor */}
        <div className="sponsor-tier">
          <h3 className="tier-title">Title Sponsor</h3>
          <div className="sponsor-cards">
            {sponsors.title.map((sponsor, index) => (
              <div
                key={sponsor.id}
                ref={addToRefs}
                data-card-id={sponsor.id}
                className={`sponsor-card title-sponsor ${
                  visibleCards.has(sponsor.id)
                    ? index % 2 === 0
                      ? "slide-in-left"
                      : "slide-in-right"
                    : ""
                }`}
                onClick={() => handleCardClick(sponsor.website)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCardClick(sponsor.website);
                }}
              >
                <div className="sponsor-logo-container">
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="sponsor-logo"
                  />
                </div>
                <div className="sponsor-info">
                  <h4 className="sponsor-name">{sponsor.name}</h4>
                  <p className="sponsor-description">{sponsor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Platform Sponsor */}
        <div className="sponsor-tier">
          <h3 className="tier-title">Tech Platform Sponsor</h3>
          <div className="sponsor-cards">
            {sponsors.platform.map((sponsor, index) => (
              <div
                key={sponsor.id}
                ref={addToRefs}
                data-card-id={sponsor.id}
                className={`sponsor-card platform-sponsor ${
                  visibleCards.has(sponsor.id)
                    ? index % 2 === 0
                      ? "slide-in-left"
                      : "slide-in-right"
                    : ""
                }`}
                onClick={() => handleCardClick(sponsor.website)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCardClick(sponsor.website);
                }}
              >
                <div className="sponsor-logo-container">
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="sponsor-logo"
                  />
                </div>
                <div className="sponsor-info">
                  <h4 className="sponsor-name">{sponsor.name}</h4>
                  <p className="sponsor-description">{sponsor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Sponsors */}
        <div className="sponsor-tier">
          <h3 className="tier-title">Media Partners</h3>
          <div className="sponsor-cards">
            {sponsors.media.map((sponsor, index) => (
              <div
                key={sponsor.id}
                ref={addToRefs}
                data-card-id={sponsor.id}
                className={`sponsor-card media-sponsor ${
                  visibleCards.has(sponsor.id)
                    ? index % 2 === 0
                      ? "slide-in-left"
                      : "slide-in-right"
                    : ""
                }`}
                onClick={() => handleCardClick(sponsor.website)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCardClick(sponsor.website);
                }}
              >
                <div className="sponsor-logo-container">
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="sponsor-logo"
                  />
                </div>
                <div className="sponsor-info">
                  <h4 className="sponsor-name">{sponsor.name}</h4>
                  <p className="sponsor-description">{sponsor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;