import React, { useEffect, useState, useContext } from "react";
import { Button } from "./Button";
import logo from "./../../../assets/pics/KDAGLogoNew.png";
import Dropdown from "./Dropdown";
import { Link, NavLink } from "react-router-dom";
import forum_img from "../../../assets/pics/forum.png";
import register_img from "../../../assets/pics/register.png";
import profile_icon from "../../../assets/pics/profile_icon.png";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";

const active_style = {
  borderBottom: "2px solid rgba(255, 255, 255, 0.8)",
  paddingBottom: "2px",
  color: "rgba(255, 255, 255, 0.8)",
};

const Navbar = ({ noborder }) => {
  const history = useHistory();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [userId, setUserId] = useState("empty");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.sub && decodedToken.sub.user_id) {
          setUserId(decodedToken.sub.user_id);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (window.location.pathname.endsWith("index.html")) {
      history.push("/");
    }
  }, [history]);

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

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
    console.log(dropdown);
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
    console.log(dropdown);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');

        .kdag-nav {
          font-family: Oswald;
          background-color: black;
          position: fixed;
          z-index: 50;
          width: 100%;
          transition: background-color 200ms linear;
          backdrop-filter: blur(20px);
        }

        .kdag-nav-contain {
          display: flex;
          justify-content: space-between;
          width: 95%;
          margin: auto;
          position: relative;
          z-index: 40;
          align-items: center;
          height: 5rem;
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
          color: rgba(255, 255, 255, 255);
        }

        .kdag-nav-item:hover{
          color: red;
          -webkit-text-stroke: 0px;
          text-shadow: 0 0 12px red;
        }

        .kdag-nav-logo {
          margin:0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          color: #dc2626;
          font-size: 2rem;
          height: 100%;
          text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9);
        }

        .kdag-nav-logo img {
          height: 2.8rem;
          width: auto;
        }

        .kdag-navbar-kdag {
          width: 20rem;
          font-size: 1rem;
          display: inline-block;
          font-family: 'Oswald';
          margin-left: 0.7rem; 
          font-weight: 900;
          letter-spacing: 1px;
          line-height: 1.2;
        }

        .kdag-nav-logo a {
          text-decoration: none;
          color: white;
          display: flex;
          align-items: center;
        }

        .kdag-nav-item {
          font-size: 1.3rem;
          margin: 1rem 0;
        }

        .kdag-nav-item::after{
          content: "";
          background: rgb(255, 0, 0);
          border-radius: 2px;
          height: 2px;
          width: 100%;
          z-index: 99999;
          left: -50%;
          top: 0px;
          position: relative;
          display: block;
          box-shadow: 0 0 10px red;
          transition: all 0.2s;
          opacity: 0;
          transform: scaleX(0);
        }

        .kdag-nav-item img{
          height: 35px;
        }

        .kdag-nav-item:hover::after {
          transform: scaleX(1);
          left: 0;
          opacity: 1;
        }

        .kdag-nav-item a {
          color: white;
          text-decoration: none;
        }

        .kdag-nav-item.ml-sheet:hover {
          color: white !important;
          -webkit-text-stroke: 0px !important;
          text-shadow: none !important;
        }

        .kdag-nav-item.ml-sheet::after {
          display: none !important;
        }

        .kdag-nav-item.ml-sheet:hover::after {
          display: none !important;
          transform: none !important;
          opacity: 0 !important;
        }

        .kdag-nav-item.ml-sheet a {
          background: linear-gradient(90deg, rgba(255,0,0,0.1), rgba(255,0,0,0.2)) !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          border: 1px solid rgba(255, 0, 0, 0.4) !important;
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.3) !important;
          transition: all 0.3s ease !important;
        }

        .kdag-nav-item.ml-sheet a:hover {
          background: linear-gradient(90deg, rgba(255,0,0,0.2), rgba(255,0,0,0.3)) !important;
          box-shadow: 0 0 25px rgba(255, 0, 0, 0.6) !important;
        }

        .kdag-nav-item.ml-sheet a.active {
          background: linear-gradient(90deg, rgba(255,0,0,0.25), rgba(255,0,0,0.35)) !important;
          border: 1px solid rgba(255, 0, 0, 0.6) !important;
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.5) !important;
          color: #ffffff !important;
        }

        .kdag-nav-mobile ul {
          -webkit-font-smoothing: antialiased;
          background: rgba(255, 0, 0, 0);
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .kdag-nav-mobile-ul li ul li img{
          height: 35px;
        }

        .kdag-nav-mobile li {
          float: left;
          margin: 0;
          padding: 0;
          position: relative;
          width: 100%;
        }

        .kdag-nav-mobile a {
          background: rgb(0, 0, 0);
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
          backdrop-filter: blur(5px);
          border-radius: 15px;
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.508);
        }

        .kdag-nav-mobile .dropdown:after {
          content: " ▶";
        }

        .kdag-nav-mobile .dropdown:hover:after {
          content: "▼";
        }

        .kdag-nav-mobile li:hover a {
          background: rgba(0, 0, 0, 0.7);
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
          background: #ffffff25;
          width: 100%;
        }

        .nav-links {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
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
            margin-top: 3px;
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
              </Link>
            </div>
            <div className="kdag-nav-items">
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/events">
                  Events
                </NavLink>
              </div>
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/gallery">
                  Gallery
                </NavLink>
              </div>
              <div className="kdag-nav-item">
                <NavLink activeStyle={active_style} to="/ml_sheet">
                  ML Sheet
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
                <NavLink activeStyle={active_style} to="/certificate">
                  Certificate
                </NavLink>
              </div>
              <div className="kdag-nav-item">
                <NavLink
                  onClick={closeMobileMenu}
                  activeStyle={active_style}
                  to="/team"
                >
                  Team
                </NavLink>
              </div>

              {!isLoggedIn && (
                <div className="kdag-nav-item">
                  <NavLink activeStyle={active_style} to="/auth">
                    <img src={register_img} alt="" />
                  </NavLink>
                </div>
              )}
              {isLoggedIn && (
                <div className="kdag-nav-item">
                  <NavLink
                    activeStyle={active_style}
                    to={`/manage-team`}
                  >
                    <img src={profile_icon} alt="" />
                  </NavLink>
                </div>
              )}
            </div>
            <nav className="kdag-nav-mobile drop">
              <ul className="kdag-nav-mobile-ul cf ">
                <li>
                  <svg
                    class="dropdown hamburgermenu"
                    width="76"
                    height="51"
                    viewBox="0 0 76 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                  </svg>

                  {isMenuOpen && (
                    <ul>
                      <li>
                        <NavLink
                          to="/events"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          Events
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/gallery"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          Gallery
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/ml_sheet"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          ML Sheet
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/resources"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          Resources
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/blogs"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          Blog
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/certificate"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          Certificate
                        </NavLink>
                      </li>
                      <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <NavLink
                          to="/team"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          Team
                        </NavLink>
                      </li>
                      <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <NavLink
                          to="/alumni"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          Alumni
                        </NavLink>
                      </li>
                      {!isLoggedIn && (
                        <li>
                          <NavLink
                            to="/auth"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                            <img src={register_img} alt="" />
                          </NavLink>
                        </li>
                      )}
                      {isLoggedIn && (
                        <li>
                          <NavLink
                            to="/manage-team"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                          >
                            <img src={profile_icon} alt="" />
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  )}
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
