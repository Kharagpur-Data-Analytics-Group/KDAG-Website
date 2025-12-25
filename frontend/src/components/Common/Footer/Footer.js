import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Footer.css";
import logo from "../../../assets/pics/KDAG_logo.jpeg";
import facebookIcon from "../../../assets/pics/facebook.png";
import gmailIcon from "../../../assets/pics/gmail.png";
import linkedinIcon from "../../../assets/pics/linkedin.png";
import instagramIcon from "../../../assets/pics/instagram.png";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Main Menu Column */}
          <div className="footer-column">
            <h4 className="footer-heading">Main Menu</h4>
            <div className="footer-links">
              <Link to="/events" className="footer-link">Events</Link>
              <Link to="/resources" className="footer-link">Resources</Link>
              <Link to="/blogs" className="footer-link">Blog</Link>
            </div>
          </div>

          {/* Follow Us Column */}
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

          {/* KDAG Info Column */}
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
  );
};

export default Footer;