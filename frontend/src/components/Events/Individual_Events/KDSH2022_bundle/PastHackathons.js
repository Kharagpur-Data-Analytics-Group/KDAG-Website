import React from "react";
import "./PastHackathons.css";
import Fade from "../../../Common/Motion/Fade.js"
import KDSH2021 from "../../../../assets/pics/HACKPoster.png";
import KDSH2020 from "../../../../assets/pics/events/KDSH2020.jpg";

const PastHackathons = () => {
  return (
    <>
      <div className="past-container">
        <div className="past-pair">
          <Fade left>
            <div className="past-pair-text">
              <div className="past-pair-heading">
                <span className="past-pair-word">
                  Kharagpur Data Science Hackathon, 2nd Edition
                </span>
              </div>
              <div className="past-pair-paragraph">
                Date: 21st November, 2021 - 30th November, 2021 <br /> <br />
                Sponsored by: RedBus <br /> <br />
                Prize Money: Rs 60,000
              </div>
              <a
                href="https://unstop.com/p/kharagpur-data-science-hackathon-indian-institute-of-technology-iit-kharagpur-232484"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="past-card-button">
                  <div className="past-card-button2">
                    Event Information
                  </div>
                </div>
              </a>
            </div>
          </Fade>
          <Fade right>
            <a className="past-pair-graphics" href="https://unstop.com/p/kharagpur-data-science-hackathon-indian-institute-of-technology-iit-kharagpur-232484" target="_blank" rel="noopener noreferrer">
              <img src={KDSH2021} alt="CONTENT GRAPHICS 1" />
            </a>
          </Fade>
        </div>

        <div className="past-pair">
          <Fade left>
            <div className="past-pair-text past-mobile">
              <div className="past-pair-heading">
                <span className="past-pair-word">
                  Kharagpur Data Science Hackathon, 1st Edition
                </span>
              </div>
              <div className="past-pair-paragraph">
                Date: 15th March, 2021 - 1st April, 2021 <br /> <br />
                Sponsored by: Airtel <br /> <br />
                Prize Money: Rs 50,000
              </div>
              <a
                href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-kharagpur-data-analytics-group-148743?fbclid=IwAR1E1C-_-4gCSdY8FkZ4eaa9wk5FbigCm_JDTDoLn10MNIBikDYso2r1p70"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="past-card-button">
                  <div className="past-card-button2">
                    Event Information
                  </div>
                </div>
              </a>
            </div>
          </Fade>
          <Fade right>
            <a className="past-pair-graphics past-mobile" href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-kharagpur-data-analytics-group-148743?fbclid=IwAR1E1C-_-4gCSdY8FkZ4eaa9wk5FbigCm_JDTDoLn10MNIBikDYso2r1p70" target="_blank" rel="noopener noreferrer">
              <img src={KDSH2020} alt="CONTENT GRAPHICS 1" />
            </a>
          </Fade>
          <Fade left>
            <a className="past-pair-graphics past-nonmobile" href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-kharagpur-data-analytics-group-148743?fbclid=IwAR1E1C-_-4gCSdY8FkZ4eaa9wk5FbigCm_JDTDoLn10MNIBikDYso2r1p70" target="_blank" rel="noopener noreferrer">
              <img src={KDSH2020} alt="CONTENT GRAPHICS 1" />
            </a>
          </Fade>
          <Fade right>
            <div className="past-pair-text past-nonmobile">
              <div className="past-pair-heading past-nonmobile">
                <span className="past-pair-word">
                  Kharagpur Data Science Hackathon, 1st Edition
                </span>
              </div>
              <div className="past-pair-paragraph past-nonmobile">
                Date: 15th March, 2021 - 1st April, 2021 <br /> <br />
                Sponsored by: Airtel <br /> <br />
                Prize Money: Rs 50,000
              </div>
              <a
                href="https://unstop.com/hackathon/kharagpur-data-science-hackathon-kharagpur-data-analytics-group-148743?fbclid=IwAR1E1C-_-4gCSdY8FkZ4eaa9wk5FbigCm_JDTDoLn10MNIBikDYso2r1p70"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className="past-card-button">
                  <div className="past-card-button2">
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
