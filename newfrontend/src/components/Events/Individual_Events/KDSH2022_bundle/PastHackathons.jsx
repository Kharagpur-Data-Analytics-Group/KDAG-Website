import React from "react";
import Fade from "../../../Common/Motion/Fade"
import KDSH2021 from "../../../../assets/pics/HACKPoster.png";
import KDSH2020 from "../../../../assets/pics/events/KDSH2020.jpg";

const PastHackathons = () => {
  return (
    <>
      <div className="m-auto! w-[80%] relative z-15">
        <div className="flex max-[800px]:block">
          <Fade left>
            <div className="w-[50%] font-[1.2rem] p-[2rem]! max-[800px]:w-full">
              <div className="text-[2.5rem] font-bold mb-[1rem]! text-[#d9dddc]!">
                <span className="uppercase"
                style={{fontFamily : 'Segoe UI'}}>
                  Kharagpur Data Science Hackathon, 2nd Edition
                </span>
              </div>
              <div className="text-[#a5a9ae]! text-[1.2rem]"
              style={{fontFamily : '"Merriweather", "Times New Roman", serif'}}>
                Date: 21st November, 2021 - 30th November, 2021 <br /> <br />
                Sponsored by: RedBus <br /> <br />
                Prize Money: Rs 60,000
              </div>
              <a
                href="https://unstop.com/p/kharagpur-data-science-hackathon-indian-institute-of-technology-iit-kharagpur-232484"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="w-[60%] m-auto! bg-[#4e3eff] text-white! flex shadow-[1px_1px_10px_1px_rgba(0,0,0,0.5)] min-w-[20rem] mt-[2.5rem]! hover:bg-[#7f74fb]">
                  <div className="inline-block p-[1rem]! grow text-[1.2rem]"
                  style={{fontFamily : 'Segoe UI'}}>
                    Event Information
                  </div>
                </div>
              </a>
            </div>
          </Fade>
          <Fade right>
            <a className="w-[50%] p-[2rem]! max-[800px]:w-full" href="https://unstop.com/p/kharagpur-data-science-hackathon-indian-institute-of-technology-iit-kharagpur-232484" target="_blank" rel="noopener noreferrer">
              <img src={KDSH2021} alt="CONTENT GRAPHICS 1" className="w-full" />
            </a>
          </Fade>
        </div>

        <div className="flex max-[800px]:block">
          <Fade left>
            <div className="w-[50%] text-[1.2rem] p-[2rem]! max-[800px]:w-full hidden max-[800px]:block">
              <div className="font-[2.5rem] font-bold mb-[1rem]! text-[#d9dddc]!">
                <span className="uppercase">
                  Kharagpur Data Science Hackathon, 1st Edition
                </span>
              </div>
              <div className="text-[#a5a9ae]!"
              style={{fontFamily : '"Merriweather", "Times New Roman", serif'}}>
                Date: 15th March, 2021 - 1st April, 2021 <br /> <br />
                Sponsored by: Airtel <br /> <br />
                Prize Money: Rs 50,000
              </div>
              <a
                href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-kharagpur-data-analytics-group-148743?fbclid=IwAR1E1C-_-4gCSdY8FkZ4eaa9wk5FbigCm_JDTDoLn10MNIBikDYso2r1p70"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="w-[60%] m-auto! bg-[#4e3eff] text-white! flex shadow-[1px_1px_10px_1px_rgba(0,0,0,0.5)] min-w-[20rem] mt-[2.5rem]! hover:bg-[#7f74fb]">
                  <div className="inline-block p-[1rem]! grow">
                    Event Information
                  </div>
                </div>
              </a>
            </div>
          </Fade>
          <Fade right>
            <a className="w-[50%] p-[2rem]! max-[800px]:w-full hidden max-[800px]:block" href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-kharagpur-data-analytics-group-148743?fbclid=IwAR1E1C-_-4gCSdY8FkZ4eaa9wk5FbigCm_JDTDoLn10MNIBikDYso2r1p70" target="_blank" rel="noopener noreferrer">
              <img src={KDSH2020} alt="CONTENT GRAPHICS 1" className="w-full" />
            </a>
          </Fade>
          <Fade left>
            <a className="w-[50%] p-[2rem]! max-[800px]:w-full past-nonmobile" href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-kharagpur-data-analytics-group-148743?fbclid=IwAR1E1C-_-4gCSdY8FkZ4eaa9wk5FbigCm_JDTDoLn10MNIBikDYso2r1p70" target="_blank" rel="noopener noreferrer">
              <img src={KDSH2020} alt="CONTENT GRAPHICS 1" className="w-full" />
            </a>
          </Fade>
          <Fade right>
            <div className="w-[50%] text-[2.5rem] p-[2rem]! max-[800px]:w-full max-[800px]:block past-nonmobile">
              <div className="font-[2.5rem] font-bold mb-[1rem]! text-[#d9dddc]! past-nonmobile">
                <span className="uppercase"
                style={{fontFamily : 'Segoe UI'}}>
                  Kharagpur Data Science Hackathon, 1st Edition
                </span>
              </div>
              <div className="text-[#a5a9ae] text-[1.2rem] past-nonmobile"
              style={{fontFamily : '"Merriweather", "Times New Roman", serif'}}>
                Date: 15th March, 2021 - 1st April, 2021 <br /> <br />
                Sponsored by: Airtel <br /> <br />
                Prize Money: Rs 50,000
              </div>
              <a
                href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-kharagpur-data-analytics-group-148743?fbclid=IwAR1E1C-_-4gCSdY8FkZ4eaa9wk5FbigCm_JDTDoLn10MNIBikDYso2r1p70"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="w-[60%] m-auto! bg-[#4e3eff] text-white! flex shadow-[1px_1px_10px_1px_rgba(0,0,0,0.5)] min-w-[20rem] mt-[2.5rem]! hover:bg-[#7f74fb]">
                  <div className="inline-block p-[1rem]! grow text-[1.2rem]"
                  style={{fontFamily : 'Segoe UI'}}>
                    Event Information
                  </div>
                </div>
              </a>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default PastHackathons;
