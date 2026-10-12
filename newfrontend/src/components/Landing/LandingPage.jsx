import React, { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Fade from "../Common/Motion/Fade.js";
import Particless from "../Common/Particles/Particless";
import Content from "./Content/Content.jsx";

// Optional sections, kept disabled exactly as they were in the old LandingPage.js.
// Each one is now a single .jsx file with its CSS embedded, so enabling one is
// just an uncomment of its import and its usage in LandingPage below.
// import EventCount from "./countdown/count.jsx";
// import SponsorsSection from "./KDSH2026/SponsorsSection.jsx";
// import SponsorSlider from "./SponsorSlider.jsx";
// import Message from "./Message.jsx";

import kdag_about_us from "../../assets/KDAG_About_Us.png";
import ThinkTank from "../../assets/ThinkTankImg.jpg";

/* ───────────────────────── Banner ───────────────────────── */

const Banner = () => (
  <section className="banner">
    <div className="banner-main">
      <div className="banner-heading-flex-container">
        <div className="banner-heading-flex">
          <div className="banner-heading">
            <div className="line">
              <h3>KHARAGPUR </h3>
              <h3 className="red">DATA </h3>
            </div>
            <div className="line">
              <h3 className="red">ANALYTICS</h3>
              <h3>GROUP</h3>
            </div>
            <h1 className="m-t170 fs2rem">
              The {" "}
              <span className="red typewriter-text">
                <Typewriter
                  words={["Data Analytics", "Machine Learning"]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </span>
              {" "} Society at IIT Kharagpur
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────── Intro Blog ─────────────────────── */

const THINK_TANK_URL =
  "https://drive.google.com/file/d/1fNMl2LZt6CwavyZ2PvOGWiNvrx3LXPtO/view";

const IntroBlog = () => (
  <section className="introblog-section">
    <Fade bottom delay={200}>
      <div className="introblog-content-wrapper">
        <div className="introblog-content-flex">
          <a href={THINK_TANK_URL} target="_blank" rel="noreferrer">
            <img className="introblog-poster" src={ThinkTank} alt="Poster" />
          </a>

          <div className="introblog-content">
            <a href={THINK_TANK_URL} target="_blank" rel="noreferrer">
              <p>
                Sharpen your analytical skills with <strong>CDC 101: Think Tank</strong> brought to you by the Kharagpur Data Analytics Group. This resource is designed to elevate your CDC placement and internship preparation with <strong>200+ logic puzzles and 120+ probability problems</strong> — many sourced from real interviews at top firms like <strong>Goldman Sachs, J.P. Morgan, and Morgan Stanley</strong>. Dive into topics like Bayes' Theorem, expectations, distributions, and classic challenges like the Monty Hall problem. With step-by-step solutions and varying difficulty levels, Think Tank is ideal for both beginners and advanced learners aiming for roles in software, finance, and quantitative fields.
              </p>
            </a>
          </div>
        </div>
      </div>
    </Fade>
  </section>
);

/* ──────────────────────── About KDAG ─────────────────────── */

const AboutKdag = () => (
  <div className="about-kdag-wrapper">
    <Fade bottom>
      <div className="about-kdag">
        <div className="left-about-us">
          <img src={kdag_about_us} alt="img" className="img-about-us" />
        </div>
        <div className="right-about-us">
          <h1 className="heading-about-kdag">
            The Data Science and Machine Learning Society at IIT Kharagpur
          </h1>
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
);

/* ─────────────────────── KDSH Section ────────────────────── */

const useCounterOnVisible = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;

            const progress = timestamp - startTime;
            const value = Math.min(
              Math.floor((progress / duration) * target),
              target
            );

            setCount(value);

            if (progress < duration) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target, duration, hasAnimated]);

  return { count, ref };
};

const KDSH_FEATURES = [
  " ₹4 Lakh Prize Pool at Stake",
  "India’s Largest Data Science Hackathon",
  "Collaborations with Top Companies in Tech",
];

const KdshSection = () => {
  const { count: participants, ref: ref1 } = useCounterOnVisible(13600);
  const { count: impressions, ref: ref2 } = useCounterOnVisible(31);
  const { count: prize, ref: ref3 } = useCounterOnVisible(400000);
  const { count: institutes, ref: ref4 } = useCounterOnVisible(300);

  return (
    <Fade bottom delay={200}>
      <div className="kdsh-section">
        <div className="kdsh-bg">
          <div className="kdsh-container">
            <div className="kdsh-row">
              <div className="kdsh-main">
                <div className="kdsh-heading">
                  <h1>
                    <span className="kdsh-span">
                      Kharagpur Data Science Hackathon{" "}
                    </span>
                    2026
                  </h1>

                  <p>
                    KDSH Organized by Kharagpur Data Analytics Group (KDAG) is
                    India's largest student-run hackathon that brings together
                    the brightest minds to solve real-world problems using data
                    science, machine learning, and artificial intelligence.
                    Known for its innovation-driven challenges, industry
                    partnerships, and high-impact outcomes, KDSH is the ultimate
                    platform for aspiring data scientists to learn, compete, and
                    shine.
                  </p>

                  <div className="kdsh-subcontainer">
                    <div className="feature-container">
                      {KDSH_FEATURES.map((feature) => (
                        <div className="kdsh-feature" key={feature}>
                          <div className="kdsh-icon">
                            <i className="fa fa-check"></i>
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="kdsh-stats">
                      <div className="kdsh-stat-item">
                        <h2 ref={ref1}>{participants}+</h2>
                        <p>Participants</p>
                      </div>

                      <div className="kdsh-stat-item">
                        <h2 ref={ref2}>{impressions} Lakh+</h2>
                        <p>Impressions</p>
                      </div>

                      <div className="kdsh-stat-item">
                        <h2 ref={ref3}>
                          ₹{(prize / 100000).toFixed(1)} Lakh
                        </h2>
                        <p>Cash Prize</p>
                      </div>

                      <div className="kdsh-stat-item">
                        <h2 ref={ref4}>{institutes}+</h2>
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

/* ───────────────────────── Page ───────────────────────── */

const LandingPage = () => (
  <>
    <style>{landingPageStyles}</style>
    <div className="Landing-Page-wrapper">
      {/* <SponsorsSection /> */}
      <Banner />
      {/* <Message /> */}
      <IntroBlog />

      <section className="section-contents">
        <AboutKdag />
        <div>
          <KdshSection />
        </div>
        <Content />
      </section>

      <Particless />
    </div>
  </>
);

// Kept as real CSS (same pattern as TeamPage.jsx) instead of Tailwind
// utilities: the app still loads unlayered global resets (e.g. `* { margin: 0;
// padding: 0 }` in legacy-globals.css) which override Tailwind's layered
// utilities, and many values/breakpoints (800/900/1200px) have no exact
// Tailwind equivalent. Copied from LandingPage.css and KdshSection/KdshSection.css
// (Content/Content.css now lives in Content/Content.jsx). Site-wide rules
// (.red, .line, *, body, inputs...) live in src/legacy-globals.css.
const landingPageStyles = `
/* ── LandingPage.css ── */
.Landing-Page-wrapper {
  background-color: rgba(0, 0, 0, 0.5);
}

.about-kdag-wrapper {
  width: 100%;
  height: 100vh;
}

.heading-about-kdag {
  color: #ffb3b3;
  margin: 1rem auto;
  font-size: 2.7rem;
  font-weight: 600;
  font-family: 'Oswald';
}

.about-kdag {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 2rem;
}

.left-about-us {
  width: 50%;
  height: 80%;
  padding-left: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-about-us {
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5rem;
}

.right-about-us p {
  text-align: center;
  color: white;
}

.img-about-us {
  width: 90%;
  height: 100%;
}

.about-kdag-text {
  padding: 15px;
  border-radius: 15px;
  text-align: justify;
  transition: all 0.4s;
  color: #a2a2a2;
  font-size: large;
  text-align: left;
}

.section-contents {
  margin-top: 7rem;
}

@media screen and (max-width: 1200px) {
  .about-kdag-wrapper {
    height: auto;
    padding-bottom: 10rem;
  }

  .about-kdag {
    width: 100%;
    height: auto;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .left-about-us {
    display: none;
  }

  .right-about-us {
    width: 100%;
    height: 100%;
    padding-left: 4rem;
    padding-right: 4rem;
    padding-top: 0rem;
    padding-bottom: 0rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 0px;
  }

  .about-kdag-text {
    padding: 15px;
    border-radius: 15px;
    text-align: center;
    transition: all 0.4s;
    color: #a2a2a2;
    font-size: large;
    text-align: center;
    font-size: medium;
  }
}

@media screen and (max-width: 800px) {
  .banner-heading {
    margin-top: 5vh;
  }
}

.banner {
  height: 110vh;
  position: relative;
}

.banner-main {
  width: 100vw;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
}

.banner-heading-flex-container {
  bottom: 585px;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.banner-heading-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-heading-flex-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.banner-heading span {
  font-size: 2rem;
  font-weight: bold;
}

.banner-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-family: 'Oswald';
}

@media only screen and (min-width: 900px) {
  .banner-heading h3 {
    font-size: 95px;
    font-weight: 600;
  }
}

@media only screen and (max-width: 900px) {
  .banner-heading h3 {
    font-size: 45px;
    font-weight: 600;
  }

  .banner {
    height: 100vh;
    background-color: transparent;
    position: relative;
    top: 250px;
  }

  .banner-main {
    height: 100vh;
    background-color: transparent;
  }

  .banner-heading-flex-container {
    margin: 0 10px;
    bottom: 630px;
  }

  .banner-heading-flex {
    display: flex;
    height: 100px;
    border-radius: 50px;
  }

  .banner-heading {
    text-align: center;
    padding: 10px;
    height: 100%;
    width: 100%;
    color: #ffffff;
    -webkit-text-stroke: 0px rgb(255, 255, 255);
  }
}

.banner-heading {
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  border: none;
  color: white;
  height: 100vh;
  position: relative;
  width: 100vw;
  flex-direction: column;
  gap: 0.2rem;
}

.introblog-section {
  width: 100%;
  position: relative;
  z-index: 2;
}

.introblog-content-wrapper {
  position: relative;
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  align-items: stretch;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  top: 0;
  z-index: 2;
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: white;
}

.introblog-content-flex {
  display: flex;
  flex-direction: row;
  padding: 1.5rem;
  transition: all 0.4s ease;
  border-radius: 15px;
  max-width: 1200px;
  margin: 0 auto;
  cursor: pointer;
  gap: 2rem;
}

.introblog-poster {
  flex: 1;
  width: 100%;
  max-width: 350px;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  transition: all 0.4s ease;
  box-shadow: 0 0 3px white;
  background: #222;
}

.introblog-content-flex:hover .introblog-poster {
  border: 3px solid rgba(195, 65, 65, 1);
  box-shadow: 0 0 20px rgba(195, 65, 65, 1);
  transform: scale(0.98);
  transition: all 0.4s ease;
}

.introblog-content {
  flex: 2;
  color: #bfbfbf;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 15px;
  transition: all 0.4s ease;
  background: rgba(255, 255, 255, 0.04);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.introblog-content strong {
  position: relative;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: 1px;
  color: #fb8787;
  transition: all 0.4s ease;
}

.introblog-content:hover strong::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 3px;
  background-color: #ffb3b3;
  border-radius: 2px;
  transition: transform 0.9s ease;
  transform: scaleX(1);
}

.introblog-content strong::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 3px;
  background-color: #ffb3b3;
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.introblog-content-flex:hover .introblog-content {
  border: 3px solid rgba(195, 65, 65, 1);
  box-shadow: 0 0 20px rgba(195, 65, 65, 1);
  color: white;
  transform: scale(0.98);
  transition: all 0.4s ease;
}

@media only screen and (max-width: 900px) {
  .introblog-content-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    margin-top: 1rem;
  }

  .introblog-content-flex {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    gap: 1rem;
    max-width: 98vw;
    width: 100%;
    box-sizing: border-box;
  }

  .introblog-poster {
    width: 90vw;
    max-width: 350px;
    height: 250px;
    max-height: 250px;
    object-fit: contain;
    border-radius: 10px;
    margin-bottom: 0.5rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    display: block;
  }

  .introblog-content {
    width: 90vw !important;
    max-width: 500px;
    font-size: 1rem;
    padding: 1rem 1.2rem;
    border-radius: 12px;
  }
}

@media only screen and (max-width: 600px) {
  .introblog-content-wrapper {
    padding: 0.2rem;
    margin-top: 0.5rem;
    border-radius: 8px;
    max-width: 100vw;
  }

  .introblog-content-flex {
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
    gap: 3rem;
    border-radius: 8px;
    max-width: 100vw;
    width: 100%;
    box-sizing: border-box;
  }

  .introblog-poster {
    max-width: 84vw;
    aspect-ratio: 4/5;
    object-fit: contain;
    border-radius: 6px;
    margin: 0 1rem 0.8rem 1rem;
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    display: block;
  }

  .introblog-content {
    width: 82vw !important;
    max-width: 82vw;
    font-size: 0.95rem;
    padding: 0.7rem 0.8rem;
    margin: 0 1rem 0 1rem;
    border-radius: 8px;
  }
}

.typewriter-text {
  font-size: 3rem;
  text-decoration: none;
}

.m-t170 {
  margin-top: 80px;
}

.fs2rem {
  font-size: 2rem;
}

@media only screen and (max-width: 900px) {
  .banner {
    height: auto;
    top: 15vh;
    margin-bottom: 32rem;
  }

  .banner-main {
    height: auto;
  }

  .banner-heading-flex-container {
    margin: 0 10px;
    bottom: 0;
    margin-top: 1rem;
  }

  .banner-heading {
    height: auto;
  }
}

/* ── KdshSection/KdshSection.css ── */
.kdsh-section {
  background-color: transparent;
  padding: 0 20px;
  margin-bottom: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.kdsh-container {
  max-width: 1200px;
  margin: auto;
  background-color: rgb(0, 0, 0, 0.5);
}

.kdsh-heading h1 {
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: #f4f0f0e4;
}

.kdsh-heading p {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: #ffffff;
  font-weight: 500;
}

.kdsh-subcontainer {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}

.feature-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  background-color: transparent;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 900px;
}

.kdsh-span {
  font-weight: bold;
  color: #ff0000;
  font-size: 3rem;
}

.kdsh-feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1 1 250px;
  padding: 10px 20px;
  border-left: 4px solid #000000;
  background-color: #211d1d;
  font-size: 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.kdsh-feature:hover {
  cursor: pointer;
  transform: scale(1.08);
}

.kdsh-bg {
  background-color: transparent;
}

.kdsh-icon {
  font-size: 24px;
  color: #ff0000;
  margin-bottom: 8px;
}

.kdsh-feature span {
  font-size: 1.2rem;
  color: #ffffff;
}

.kdsh-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  background-color: transparent;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.kdsh-stat-item:hover {
  transform: scale(1.08);
  color: #ffffff;
}

.kdsh-stat-item {
  background-color: #f4f0f0e4;
  padding: 16px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.kdsh-stat-item h2 {
  font-size: 2rem;
  color: #ff0000;
  margin-bottom: 5px;
  font-weight: bolder;
}

.kdsh-stat-item p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 300;
  color: #000000;
}

@media (max-width: 600px) {
  .kdsh-heading h1 {
    font-size: 2.8rem;
  }

  .kdsh-feature span,
  .kdsh-stat-item p {
    font-size: 0.95rem;
  }

  .kdsh-stat-item h2 {
    font-size: 1.6rem;
  }
}
`;

export default LandingPage;
