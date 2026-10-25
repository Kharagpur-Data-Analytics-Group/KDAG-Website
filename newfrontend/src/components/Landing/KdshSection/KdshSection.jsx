import Fade from "../../Common/Motion/Fade.jsx";
import { useEffect, useRef, useState } from "react";

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

const KdshSection = () => {
  const { count: participants, ref: ref1 } = useCounterOnVisible(13600);
  const { count: impressions, ref: ref2 } = useCounterOnVisible(31);
  const { count: prize, ref: ref3 } = useCounterOnVisible(400000);
  const { count: institutes, ref: ref4 } = useCounterOnVisible(300);

  return (
    <Fade bottom delay={200}>
      <div className="bg-transparent !px-[20px] !mb-[30px] font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] text-[#333]">
        <div className="bg-transparent">
          <div className="max-w-[1200px] !m-auto bg-black/50">
            <div className="kdsh-row">
              <div className="kdsh-main">
                <div className="[&_h1]:text-[2.8rem] [&_h1]:font-bold [&_h1]:text-center [&_h1]:!mb-[20px] [&_h1]:text-[#f4f0f0e4] [&>p]:text-center [&>p]:text-[1.2rem] [&>p]:!mb-[40px] [&>p]:text-white [&>p]:font-medium">
                  <h1>
                    <span className="font-bold text-[#ff0000] text-[3rem]">
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

                  <div className="flex flex-col gap-[40px] items-center">
                    <div className="flex flex-wrap justify-center gap-[20px] bg-transparent !p-[20px] rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] w-full max-w-[900px]">
                      <div className="flex flex-col items-center text-center flex-[1_1_250px] !py-[10px] !px-[20px] border-l-4 border-black bg-[#211d1d] text-[24px] rounded-[8px] transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-[1.08] [&_span]:text-[1.2rem] [&_span]:text-white max-[601px]:[&_span]:text-[0.95rem]">
                        <div className="text-[24px] text-[#ff0000] !mb-[8px]">
                          <i className="fa fa-check"></i>
                        </div>
                        <span> ₹4 Lakh Prize Pool at Stake</span>
                      </div>

                      <div className="flex flex-col items-center text-center flex-[1_1_250px] !py-[10px] !px-[20px] border-l-4 border-black bg-[#211d1d] text-[24px] rounded-[8px] transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-[1.08] [&_span]:text-[1.2rem] [&_span]:text-white max-[601px]:[&_span]:text-[0.95rem]">
                        <div className="text-[24px] text-[#ff0000] !mb-[8px]">
                          <i className="fa fa-check"></i>
                        </div>
                        <span>India’s Largest Data Science Hackathon</span>
                      </div>

                      <div className="flex flex-col items-center text-center flex-[1_1_250px] !py-[10px] !px-[20px] border-l-4 border-black bg-[#211d1d] text-[24px] rounded-[8px] transition-all duration-300 ease-in-out hover:cursor-pointer hover:scale-[1.08] [&_span]:text-[1.2rem] [&_span]:text-white max-[601px]:[&_span]:text-[0.95rem]">
                        <div className="text-[24px] text-[#ff0000] !mb-[8px]">
                          <i className="fa fa-check"></i>
                        </div>
                        <span>Collaborations with Top Companies in Tech</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[20px] bg-transparent !p-[20px] rounded-[12px] w-full max-w-[900px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                      <div className="bg-[#f4f0f0e4] !p-[16px] text-center rounded-[8px] shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.08] hover:text-white [&_h2]:text-[2rem] [&_h2]:text-[#ff0000] [&_h2]:!mb-[5px] [&_h2]:font-black [&_p]:!m-0 [&_p]:text-[1.5rem] [&_p]:font-light [&_p]:text-black max-[601px]:[&_h2]:text-[1.6rem] max-[601px]:[&_p]:text-[0.95rem]">
                        <h2 ref={ref1}>{participants}+</h2>
                        <p>Participants</p>
                      </div>

                      <div className="bg-[#f4f0f0e4] !p-[16px] text-center rounded-[8px] shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.08] hover:text-white [&_h2]:text-[2rem] [&_h2]:text-[#ff0000] [&_h2]:!mb-[5px] [&_h2]:font-black [&_p]:!m-0 [&_p]:text-[1.5rem] [&_p]:font-light [&_p]:text-black max-[601px]:[&_h2]:text-[1.6rem] max-[601px]:[&_p]:text-[0.95rem]">
                        <h2 ref={ref2}>{impressions} Lakh+</h2>
                        <p>Impressions</p>
                      </div>

                      <div className="bg-[#f4f0f0e4] !p-[16px] text-center rounded-[8px] shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.08] hover:text-white [&_h2]:text-[2rem] [&_h2]:text-[#ff0000] [&_h2]:!mb-[5px] [&_h2]:font-black [&_p]:!m-0 [&_p]:text-[1.5rem] [&_p]:font-light [&_p]:text-black max-[601px]:[&_h2]:text-[1.6rem] max-[601px]:[&_p]:text-[0.95rem]">
                        <h2 ref={ref3}>
                          ₹{(prize / 100000).toFixed(1)} Lakh
                        </h2>
                        <p>Cash Prize</p>
                      </div>

                      <div className="bg-[#f4f0f0e4] !p-[16px] text-center rounded-[8px] shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.08] hover:text-white [&_h2]:text-[2rem] [&_h2]:text-[#ff0000] [&_h2]:!mb-[5px] [&_h2]:font-black [&_p]:!m-0 [&_p]:text-[1.5rem] [&_p]:font-light [&_p]:text-black max-[601px]:[&_h2]:text-[1.6rem] max-[601px]:[&_p]:text-[0.95rem]">
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