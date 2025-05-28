import "./KdshSection.css";
import Fade from "react-reveal/Fade";
import { useEffect, useRef, useState } from "react";

const KdshSection = () => {
    const useCounterOnVisible = (target, duration = 1000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            let start = 0;
            const step = Math.ceil(target / (duration / 28));

            const interval = setInterval(() => {
              start += step;
              if (start >= target) {
                start = target;
                clearInterval(interval);
              }
              setCount(start);
            }, 16);
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

  const { count: participants, ref: ref1 } = useCounterOnVisible(9900);
  const { count: impressions, ref: ref2 } = useCounterOnVisible(860000);
  const { count: prize, ref: ref3 } = useCounterOnVisible(250000);
  const { count: institutes, ref: ref4 } = useCounterOnVisible(300);

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
                  <h1>
                    <span className="kdsh-span">
                      Kharagpur Data Science Hackathon{" "}
                    </span>
                    2025
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
                        <span>India’s Largest Data Science Hackathon</span>
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
                        <h2 ref={ref1}>{participants}+</h2>
                        <p>Participants</p>
                      </div>
                      <div className="kdsh-stat-item">
                        <h2 ref={ref2}>
                          {(impressions / 100000).toFixed(1)} Lakh+
                        </h2>
                        <p>Impressions</p>
                      </div>
                      <div className="kdsh-stat-item">
                        <h2 ref={ref3}>₹{(prize / 100000).toFixed(1)} Lakh</h2>
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

export default KdshSection;
