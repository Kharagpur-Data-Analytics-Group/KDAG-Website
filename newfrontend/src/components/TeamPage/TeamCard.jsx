import React from "react";
import Fade from "../Common/Motion/Fade.jsx";

const TeamCard = ({ member }) => {
  return (
    <div className="member-card-wrapper-head" style={{ width: "50%", maxWidth: "15rem", margin: "2rem" }}>
      <style>{teamCardStyles}</style>
      <Fade bottom>
        <div className="member-card-head">
          <div className="member-profile-image-head">
            <img src={member?.image} alt="Image" />
          </div>
          <div className="member-name-head">
            <p>{member?.name || "Name of Member"}</p>
          </div>
          <div className="member-profile-follow">
            <div className="member-follow-text">
              <span>Follow</span>
            </div>
            <div className="member-social-icon">
              <div className="member-social-icon-icon">
                {member?.facebook && (
                  <a
                    href={member?.facebook || "#"}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                )}
              </div>
              <div className="member-social-icon-icon">
                <a
                  href={member?.linkedin || "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <div className="member-social-icon-icon">
                {member?.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                )}
              </div>
              <div className="member-social-icon-icon">
                {member?.email && (
                  <a href={`mailto:${member.email}`}>
                    <i className="fas fa-envelope"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

// Kept as real CSS (not Tailwind): deep hover/descendant-selector dependencies
// and cascade-order-dependent overrides — e.g. ".member-card-head
// .member-name-head" overrides the cursive font-family with a system font
// stack, and ".member-card-head p" overrides text color on top of that.
// Flattening these into inline styles or utility classes would risk changing
// the rendered result.
const teamCardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

  .member-card-head {
    padding: 2rem;
    border-radius: 5px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    background: rgba(255, 255, 255, 0.042);
    backdrop-filter: blur(3px);
    font-weight: 500;
    transition: all 0.7s, box-shadow 1s, top 1s, left 1s;
  }

  .member-card-head:hover {
    background-color: rgba(104, 58, 58, 0.15);
    box-shadow: 0 0 25px rgba(250, 57, 70, 1);
  }

  .member-card-head:hover p {
    color: #fb8787;
    border-top-right-radius: 50px;
  }

  .member-profile-image-head {
    position: relative;
    margin: auto;
    width: 10rem;
    height: 10rem;
    overflow: hidden;
    border-radius: 200px;
    margin-bottom: 1rem;
    top: 0px;
    left: 0px;
    transition: all 0.8s;
  }

  .member-profile-image-head img {
    width: 100%;
  }

  .member-name-head {
    font-size: 1.5rem;
    text-align: center;
    color: #fff;
    height: 65px;
    position: relative;
    bottom: 0px;
    transition: all 0.5s;
    font-family: 'Satisfy', cursive;
    line-height: 25px;
  }

  .member-card-head:hover .member-name {
    bottom: 0;
  }

  .member-profile-follow {
    color: #777;
    display: flex;
    justify-content: space-between;
    position: relative;
    bottom: -10px;
    transition: all 0.3s;
    opacity: 0;
  }

  .member-follow-text {
    padding-left: 15px;
  }

  .member-card-head:hover .member-profile-follow {
    opacity: 1;
    transform: scale(1.2);
  }

  .member-social-icon {
    display: flex;
    padding-right: 15px;
  }

  .member-social-icon-icon {
    padding-left: 0.8rem;
  }

  .member-social-icon-icon a {
    text-decoration: none;
    color: inherit;
  }

  .member-social-icon-icon:hover {
    color: #fb8787;
  }

  .member-card-head .member-name-head {
    color: #fb8787;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  .member-card-head p {
    color: #f7f7f7;
    font-weight: bold;
  }

  @media screen and (max-width: 1200px) {
    .member-profile-follow {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1000px) {
    .member-card-head:hover {
      transform: scale(2.05);
    }
  }

  @media screen and (max-width: 800px) {
    .member-profile-follow {
      color: #ea1313;
      display: flex;
      justify-content: space-between;
      position: relative;
      bottom: -10px;
      transition: all 0.3s;
      opacity: 1;
    }

    .member-social-icon {
      padding-right: 0px;
    }
  }
`;

export default TeamCard;
