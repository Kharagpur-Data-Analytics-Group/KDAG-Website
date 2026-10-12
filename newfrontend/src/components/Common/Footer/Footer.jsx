import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/pics/KDAG_logo.jpeg";
import facebookIcon from "../../../assets/pics/facebook.png";
import gmailIcon from "../../../assets/pics/gmail.png";
import linkedinIcon from "../../../assets/pics/linkedin.png";
import instagramIcon from "../../../assets/pics/instagram.png";

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-section {
          background-color: rgba(129, 129, 132, 0.25);
          backdrop-filter: blur(10px);
          color: #ffffff;
          padding: 1.5rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          width: 100%;
          position: relative;
          z-index: 100;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .footer-grid {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .footer-column {
          flex: 1;
          min-width: 250px;
          text-align: center;
          position: relative;
        }

        .footer-column:not(:last-child)::after {
          content: "";
          position: absolute;
          right: -0.75rem;
          top: 10%;
          height: 80%;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .footer-heading {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-transform: capitalize;
          letter-spacing: 0.5px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #3b82f6;
        }

        .footer-socials {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          align-items: center;
        }

        .social-icon img {
          width: 28px;
          height: 28px;
          transition: transform 0.3s ease;
        }

        .social-icon:hover img {
          transform: translateY(-3px);
        }

        .footer-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .footer-link-text {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.95rem;
          line-height: 1.4;
          max-width: 300px;
        }

        .footer-link-text:hover {
          color: #ffffff;
        }

        .footer-divider {
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          width: 100%;
          margin: 1.5rem 0;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .footer-logo {
          width: 60px;
          height: auto;
          border-radius: 4px;
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-bottom-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .footer-bottom-link:hover {
          color: #ffffff;
        }

        .footer-separator {
          color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .footer-grid {
            flex-direction: column;
            text-align: center;
          }

          .footer-column:not(:last-child)::after {
            display: none;
          }

          .footer-column {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 2rem;
          }

          .footer-column:last-child {
            border-bottom: none;
          }
        }
      `}</style>

      <div className="footer-section">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <h4 className="footer-heading">Main Menu</h4>
              <div className="footer-links">
                <Link to="/events" className="footer-link">Events</Link>
                <Link to="/resources" className="footer-link">Resources</Link>
                <Link to="/blogs" className="footer-link">Blog</Link>
              </div>
            </div>

            <div className="footer-column center-column">
              <h4 className="footer-heading">Follow Us</h4>
              <div className="footer-socials">
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.facebook.com/kgpdag"
                  className="social-icon"
                >
                  <img src={facebookIcon} alt="Facebook" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.linkedin.com/company/kdag/"
                  className="social-icon"
                >
                  <img src={linkedinIcon} alt="Linkedin" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.instagram.com/kdag.iitkgp/"
                  className="social-icon"
                >
                  <img src={instagramIcon} alt="Instagram" />
                </a>
                <a href="mailto:kdagiitkgp@gmail.com" className="social-icon">
                  <img src={gmailIcon} alt="Mail" />
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Kharagpur Data Analytics Group</h4>
              <div className="footer-text">
                <a
                  href="http://iitkgp.ac.in"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="footer-link-text"
                >
                  Indian Institute of Technology Kharagpur, India
                </a>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <a href="/" className="footer-logo-link">
              <img src={logo} className="footer-logo" alt="kdag-logo" />
            </a>
            <div className="footer-bottom-links">
              <a
                className="footer-bottom-link"
                target="_blank"
                rel="noreferrer noopener"
                href="http://iitkgp.ac.in"
              >
                IIT KGP
              </a>
              <span className="footer-separator">|</span>
              <NavLink to="/team" className="footer-bottom-link">Contact Us</NavLink>
              <span className="footer-separator">|</span>
              <NavLink to="/privacy-policy" className="footer-bottom-link">Privacy Policy</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
