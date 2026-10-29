import React from "react";
import { Link } from "react-router-dom";

import pathwayLogo from "./../../../assets/KDSH2026_sponsor_logos/Pathway.png";
import academicInsightsLogo from "./../../../assets/KDSH2026_sponsor_logos/AcademicInsights.png";
import youthIncLogo from "./../../../assets/KDSH2026_sponsor_logos/YouthIncorporated.png";
import trueFoundryLogo from "./../../../assets/KDSH2026_sponsor_logos/TrueFoundry.png";
import tghLogo from "./../../../assets/KDSH2026_sponsor_logos/TGHLogo2.png";

const items = [
  { img: pathwayLogo, text: "Title Sponsor", website: "https://pathway.com" },
  { img: trueFoundryLogo, text: "Tech Platform Sponsor", website: "https://truefoundry.com" },
  { img: academicInsightsLogo, text: "Media Partner", website: "https://theacademicinsights.com" },
  { img: tghLogo, text: "Media Partner", website: "https://theglobalhues.com/" },
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
    <>
      <style>{sponsorsSectionStyles}</style>
      <div className="container-hehehe">
        <div className="heading-hehehe">
          <h1>
            <span className="red">Kharagpur Data <br /> Science Hackathon</span> <span className="white">2026</span>
          </h1>
        </div>

        <Marquee />
        <Link
          className="register-button"
          to="/certificate"
        >
          Get Certificate
        </Link>
      </div>
    </>
  );
}

// Kept as real CSS (same pattern as TeamPage.jsx / LandingPage.jsx): the glow
// shadows, gradient text and clamp() sizing have no exact Tailwind tokens.
// Copied from SponsorsSection.css. @keyframes scroll -> sponsorsScroll and
// headingFade -> sponsorsHeadingFade so they can't clash with the other
// `scroll` keyframes in the app (Navbar, SponsorSlider).
const sponsorsSectionStyles = `
.container-hehehe {
  margin-top: 10rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.heading-hehehe {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  opacity: 0;
  transform: translateY(14px);
  animation: sponsorsHeadingFade 0.8s ease-out forwards;
}

.heading-hehehe h1 {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2.2rem, 5.5vw, 4.5rem);
  font-weight: 900;
  letter-spacing: 0.01em;
  margin: 0;
  line-height: 1.08;
  text-transform: uppercase;
}

.heading-hehehe .red {
  background: linear-gradient(180deg, #ff5252, #c30000);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.heading-hehehe .white {
  color: #ffffff;
}

.heading-hehehe #subheading {
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 500;
  color: #e5e5e5;
  margin-top: 8px;
  letter-spacing: 0.04em;
}

.heading-hehehe::after {
  content: "";
  width: 110px;
  height: 3px;
  margin: 14px auto 0;
  display: block;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, #ff2a2a, transparent);
  box-shadow: 0 0 14px rgba(255, 0, 0, 0.45);
  opacity: 0.85;
}

@keyframes sponsorsHeadingFade {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.marquee {
  width: 100%;
  overflow: hidden;
  background: rgba(20, 20, 20, 0.6);
  padding: 22px 0;
  margin-top: 50px;
  box-shadow:
    0 0 6px rgba(255, 0, 0, 0.5),
    0 0 18px rgba(255, 0, 0, 0.55),
    0 0 28px rgba(255, 0, 0, 0.5);
  border-top: 1px solid rgba(255, 0, 0, 0.4);
  border-bottom: 1px solid rgba(255, 0, 0, 0.4);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: sponsorsScroll 20s linear infinite;
  will-change: transform;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes sponsorsScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 0 44px;

  text-decoration: none;
  color: rgb(245, 245, 245);
  white-space: nowrap;

  transition:
    transform 0.22s ease,
    opacity 0.22s ease;
}

.marquee-item img {
  height: 120px;
  width: auto;
  object-fit: contain;
  pointer-events: none;
}

.marquee-item span {
  font-family: 'Oswald', sans-serif;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: white;
}

.marquee-item:hover {
  transform: translateY(-6px) scale(1.03);
  opacity: 0.9;
}

.marquee-item:focus-visible {
  outline: 2px solid red;
  border-radius: 6px;
}

.register-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  margin-top: 24px;
  padding: 12px 22px;

  max-width: 15rem;

  color: #ffffff !important;
  background: linear-gradient(135deg, #ff1e1e, #cc0000);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);

  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.4px;

  cursor: pointer;
  text-decoration: none;

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.25s ease,
    border 0.25s ease;
}

.register-button:hover {
  color: white !important;
  background: linear-gradient(135deg, #ff3535, #e60000);
  transform: scale(1.02);
  border-color: rgba(255, 255, 255, 0.25);
}

.register-button:active {
  transform: translateY(0);
  box-shadow: 0 6px 18px rgba(255, 0, 0, 0.28);
}

.register-button:focus {
  outline: 2px solid rgba(255, 255, 255, 0.35);
  outline-offset: 3px;
}


@media (max-width: 900px) {
  .marquee-item img {
    height: 95px;
  }
}

@media (max-width: 650px) {
  .marquee-item {
    padding: 0 26px;
  }

  .marquee-item img {
    height: 80px;
  }

  .marquee-item span {
    font-size: 16px;
  }

  .heading-hehehe h1 {
    font-size: 40px !important;
  }
}

@media (max-width: 450px) {
  .marquee {
    padding: 16px 0;
  }

  .marquee-item img {
    height: 70px;
  }
}
`;
