import React, { useEffect } from "react";
import logo from "./../../../assets/pics/KDAGLogoNew.jpeg";
import { Link, NavLink } from "react-router-dom";

const active_style = {
  borderBottom: "2px solid rgba(255, 255, 255, 0.7)",
  color: "rgba(255, 255, 255, 0.7)",
};

const Navbar = ({ color, noborder }) => {
  useEffect(() => {
    const navColor = (e) => {
      let nav = document.getElementsByClassName("kdag-nav")[0];
      nav.classList.toggle("scrolled", window.scrollY > 0);
    };
    navColor();
    document.addEventListener("scroll", navColor);
    return () => {
      document.removeEventListener("scroll", navColor);
    };
  }, []);

  return (
    <>
      <style>{`
        .kdag-nav {
          position: fixed;
          z-index: 20;
          width: 100%;
          transition: background-color 200ms linear;
        }

        .kdag-nav.scrolled {
          background-color: #172755;
          transition: background-color 200ms linear;
          box-shadow: rgba(0, 0, 0, 0.7) 2px 0 10px 4px;
        }

        .kdag-nav-contain {
          display: flex;
          justify-content: space-between;
          width: 95%;
          margin: auto;
          position: relative;
          z-index: 10;
          align-items: center;
        }

        .kdag-nav-contain-border {
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        }

        .kdag-nav-items {
          display: flex;
          width: 40%;
          justify-content: space-between;
          max-width: 40rem;
          align-items: center;
          color: rgba(255, 255, 255, 0.4);
        }

        .kdag-nav-item:hover{
          opacity:0.5;
        }

        .kdag-nav-logo {
          margin: 0.5rem 2rem 0 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          color: #dc2626;
          font-size: 2rem;
          height: 100%;
          padding-bottom: 0.5rem;
          text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9);
        }

        .kdag-nav-logo img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 5%;
          box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.9);
        }

        .kdag-navbar-kdag {
          width: 20rem;
          font-size: 1rem;
          display: inline-block;
          font-family: "Poppins", sans-serif;
          margin-left: 0.5rem;
          font-weight: 900;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.95)
        }

        .kdag-nav-logo a {
          text-decoration: none;
          color: white;
          display: flex;
          align-items: center;
        }

        .kdag-nav-item {
          font-size: 1.2rem;
          margin: 1rem 0;
        }

        .kdag-nav-item a {
          color: inherit;
          text-decoration: none;
        }

        .kdag-nav-mobile ul {
          -webkit-font-smoothing: antialiased;
          background: #172755;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .kdag-nav-mobile li {
          float: left;
          margin: 0;
          padding: 0;
          position: relative;
          width: 100%;
        }

        .kdag-nav-mobile a {
          background: #172755;
          color: #8794ba;
          display: block;
          font: bold 16px/50px sans-serif;
          padding: 0 25px;
          text-align: center;
          text-decoration: none;
          -webkit-transition: all 0.25s ease;
          -moz-transition: all 0.25s ease;
          -ms-transition: all 0.25s ease;
          -o-transition: all 0.25s ease;
          transition: all 0.25s ease;
        }

        .kdag-nav-mobile .dropdown:after {
          content: " ▶";
        }

        .kdag-nav-mobile .dropdown:hover:after {
          content: "";
        }

        .kdag-nav-mobile li:hover a {
          background: #172755;
        }

        .kdag-nav-mobile li ul {
          float: right;
          right: 0;
          opacity: 0;
          position: absolute;
          top: 35px;
          visibility: hidden;
          z-index: 1;
          -webkit-transition: all 0.25s ease;
          -moz-transition: all 0.25s ease;
          -ms-transition: all 0.25s ease;
          -o-transition: all 0.25s ease;
          transition: all 0.25s ease;
          width: 20rem;
          box-shadow: 1px 1px 15px 10px rgba(0, 0, 0, 0.5)
        }

        .kdag-nav-mobile li:hover ul {
          opacity: 1;
          top: 50px;
          visibility: visible;
        }

        .kdag-nav-mobile li ul li {
          float: none;
          width: 100%;
          color: white;
        }

        .kdag-nav-mobile li ul a:hover {
          background: #bbb;
          width: 100%;
        }

        .hamburgermenu {
          width: 40px;
          height: 40px;
        }

        .drop {
          display: none;
          text-align: right;
        }

        @media (max-width: 740px) {
          .kdag-nav-item {
            display: none;
          }

          .drop {
            display: block;
          }

          .kdag-nav-mobile a {
            padding: 2px;
          }
        }
      `}</style>

      <div className="kdag-nav-container">
        <div className="kdag-nav">
          <div
            className={`kdag-nav-contain ${
              noborder ? "" : "kdag-nav-contain-border"
            }`}
          >
            <div className="kdag-nav-logo">
              <Link to="/">
                <img src={logo} alt="LOGO" />
                <div className="kdag-navbar-kdag">
                  KHARAGPUR DATA ANALYTICS GROUP
                </div>
              </Link>
            </div>
            <div className="kdag-nav-items">
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/events">
                  Events
                </NavLink>
              </div>
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/resources">
                  Resources
                </NavLink>
              </div>
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/blogs">
                  Blog
                </NavLink>
              </div>
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/team">
                  Team
                </NavLink>
              </div>
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/alumni">
                  Alumni
                </NavLink>
              </div>
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/forum">
                  Forum
                </NavLink>
              </div>
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/certificate">  
                  Certificate
                </NavLink>
              </div>
              {!isLoggedIn && (
                <div className="kdag-nav-item">
                  <NavLink activeStyle={active_style} to="/auth">
                    Register
                  </NavLink>
                </div>
              )}
            </div>
            <nav className="kdag-nav-mobile drop">
              <ul className="kdag-nav-mobile-ul cf">
                <li>
                  <svg
                    class="dropdown hamburgermenu"
                    width="76"
                    height="51"
                    viewBox="0 0 76 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="76"
                      height="11.7049"
                      rx="5.85246"
                      fill="white"
                      fill-opacity="0.3"
                    />
                    <rect
                      y="39.2951"
                      width="76"
                      height="11.7049"
                      rx="5.85246"
                      fill="white"
                      fill-opacity="0.3"
                    />
                    <rect
                      y="19.2295"
                      width="76"
                      height="11.7049"
                      rx="5.85246"
                      fill="white"
                      fill-opacity="0.3"
                    />
                    <rect
                      y="19.2295"
                      width="76"
                      height="11.7049"
                      rx="5.85246"
                      fill="white"
                      fill-opacity="0.3"
                    />
                    <rect
                      y="19.2295"
                      width="76"
                      height="11.7049"
                      rx="5.85246"
                      fill="white"
                      fill-opacity="0.3"
                    />
                  </svg>

                  <ul>
                    <li>
                      <NavLink to="/events">Events</NavLink>
                    </li>
                    <li>
                      <NavLink to="/resources">Resources</NavLink>
                    </li>
                    <li>
                      <NavLink to="/blogs">Blog</NavLink>
                    </li>
                    <li>
                      <NavLink to="/team">Team</NavLink>
                    </li>
                    <li>
                      <NavLink to="/alumni">Alumni</NavLink>
                    </li>
                    <li>
                      <NavLink to="/forum">Forum</NavLink>
                    </li>
                    <li>
                      <NavLink to="/certificate">Certificate</NavLink>
                    </li>
                    <li>
                      <NavLink to="/auth">Register</NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
