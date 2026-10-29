import React, { useEffect } from "react";
import logo from "./../../../assets/pics/KDAGLogoNew.webp";
import { Link, NavLink } from "react-router-dom";
const active_style = {
  borderBottom: "2px solid rgba(255, 255, 255, 0.7)",
  color: "rgba(255, 255, 255, 0.7)"
};
const Navbar = ({
  color,
  noborder
}) => {
  useEffect(() => {
    const navColor = e => {
      let nav = document.getElementsByClassName("kdag-nav")[0];
      nav.classList.toggle("scrolled", window.scrollY > 0);
    };
    navColor();
    document.addEventListener("scroll", navColor);
    return () => {
      document.removeEventListener("scroll", navColor);
    };
  }, []);
  return <div className="kdag-nav-container"><style>{"@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap')"}</style>
      <div className="kdag-nav [font-family:Oswald]! [background-color:black]! [position:fixed]! [z-index:50]! [width:100%]! [transition:background-color_200ms_linear]! [backdrop-filter:blur(20px)]!">
        <div className={`kdag-nav-contain [display:flex]! [justify-content:space-between]! [width:95%]! [margin:auto]! [position:relative]! [z-index:40]! [align-items:center]! [height:5rem]! ${noborder ? "" : "kdag-nav-contain-border [border-bottom:2px_solid_rgba(255,_255,_255,_0.2)]!"} `}>
          <div className="kdag-nav-logo [margin:0]! [display:flex]! [flex-direction:row]! [align-items:center]! [justify-content:center]! [color:#dc2626]! [font-size:2rem]! [height:100%]! [text-shadow:3px_3px_10px_rgba(0,_0,_0,_0.9)]! [&_img]:[height:2.8rem]! [&_img]:[width:auto]! [&_a]:[text-decoration:none]! [&_a]:[color:white]! [&_a]:[display:flex]! [&_a]:[align-items:center]!">
            <Link to="/">
              <img src={logo} alt="LOGO" />
              <div className="kdag-navbar-kdag [width:20rem]! [font-size:1rem]! [display:inline-block]! [font-family:'Oswald']! [margin-left:0.7rem]! [font-weight:900]! [letter-spacing:1px]! [line-height:1.2]!">
                KHARAGPUR DATA ANALYTICS GROUP
              </div>
            </Link>
          </div>
          <div className="kdag-nav-items [display:flex]! [width:40%]! [justify-content:space-between]! [max-width:40rem]! [align-items:center]! [color:rgba(255,_255,_255,_255)]!">
            <div className="kdag-nav-item [&:hover]:[color:red]! [&:hover]:[-webkit-text-stroke:0px]! [&:hover]:[text-shadow:0_0_12px_red]! [font-size:1.3rem]! [margin:1rem_0]! [&::after]:[content:'']! [&::after]:[background:rgb(255,_0,_0)]! [&::after]:[border-radius:2px]! [&::after]:[height:2px]! [&::after]:[width:100%]! [&::after]:[z-index:99999]! [&::after]:[left:-50%]! [&::after]:[top:0px]! [&::after]:[position:relative]! [&::after]:[display:block]! [&::after]:[box-shadow:0_0_10px_red]! [&::after]:[transition:all_0.2s]! [&::after]:[opacity:0]! [&::after]:[transform:scaleX(0)]! [&_img]:[height:35px]! [&:hover::after]:[transform:scaleX(1)]! [&:hover::after]:[left:0]! [&:hover::after]:[opacity:1]! [&_a]:[color:white]! [&_a]:[text-decoration:none]! [&.ml-sheet:hover]:[color:white]! [&.ml-sheet:hover]:[-webkit-text-stroke:0px]! [&.ml-sheet:hover]:[text-shadow:none]! [&.ml-sheet::after]:[display:none]! [&.ml-sheet:hover::after]:[display:none]! [&.ml-sheet:hover::after]:[transform:none]! [&.ml-sheet:hover::after]:[opacity:0]! [&.ml-sheet_a]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.1),_rgba(255,_0,_0,_0.2))]! [&.ml-sheet_a]:[padding:8px_16px]! [&.ml-sheet_a]:[border-radius:6px]! [&.ml-sheet_a]:[border:1px_solid_rgba(255,_0,_0,_0.4)]! [&.ml-sheet_a]:[box-shadow:0_0_15px_rgba(255,_0,_0,_0.3)]! [&.ml-sheet_a]:[transition:all_0.3s_ease]! [&.ml-sheet_a:hover]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.2),_rgba(255,_0,_0,_0.3))]! [&.ml-sheet_a:hover]:[box-shadow:0_0_25px_rgba(255,_0,_0,_0.6)]! max-[740.01px]:[display:none]!">
              <NavLink activeStyle={active_style} to="/events">
                Events
              </NavLink>
            </div>
            <div className="kdag-nav-item [&:hover]:[color:red]! [&:hover]:[-webkit-text-stroke:0px]! [&:hover]:[text-shadow:0_0_12px_red]! [font-size:1.3rem]! [margin:1rem_0]! [&::after]:[content:'']! [&::after]:[background:rgb(255,_0,_0)]! [&::after]:[border-radius:2px]! [&::after]:[height:2px]! [&::after]:[width:100%]! [&::after]:[z-index:99999]! [&::after]:[left:-50%]! [&::after]:[top:0px]! [&::after]:[position:relative]! [&::after]:[display:block]! [&::after]:[box-shadow:0_0_10px_red]! [&::after]:[transition:all_0.2s]! [&::after]:[opacity:0]! [&::after]:[transform:scaleX(0)]! [&_img]:[height:35px]! [&:hover::after]:[transform:scaleX(1)]! [&:hover::after]:[left:0]! [&:hover::after]:[opacity:1]! [&_a]:[color:white]! [&_a]:[text-decoration:none]! [&.ml-sheet:hover]:[color:white]! [&.ml-sheet:hover]:[-webkit-text-stroke:0px]! [&.ml-sheet:hover]:[text-shadow:none]! [&.ml-sheet::after]:[display:none]! [&.ml-sheet:hover::after]:[display:none]! [&.ml-sheet:hover::after]:[transform:none]! [&.ml-sheet:hover::after]:[opacity:0]! [&.ml-sheet_a]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.1),_rgba(255,_0,_0,_0.2))]! [&.ml-sheet_a]:[padding:8px_16px]! [&.ml-sheet_a]:[border-radius:6px]! [&.ml-sheet_a]:[border:1px_solid_rgba(255,_0,_0,_0.4)]! [&.ml-sheet_a]:[box-shadow:0_0_15px_rgba(255,_0,_0,_0.3)]! [&.ml-sheet_a]:[transition:all_0.3s_ease]! [&.ml-sheet_a:hover]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.2),_rgba(255,_0,_0,_0.3))]! [&.ml-sheet_a:hover]:[box-shadow:0_0_25px_rgba(255,_0,_0,_0.6)]! max-[740.01px]:[display:none]!">
              <NavLink activeStyle={active_style} to="/resources">
                Resources
              </NavLink>
            </div>
            <div className="kdag-nav-item [&:hover]:[color:red]! [&:hover]:[-webkit-text-stroke:0px]! [&:hover]:[text-shadow:0_0_12px_red]! [font-size:1.3rem]! [margin:1rem_0]! [&::after]:[content:'']! [&::after]:[background:rgb(255,_0,_0)]! [&::after]:[border-radius:2px]! [&::after]:[height:2px]! [&::after]:[width:100%]! [&::after]:[z-index:99999]! [&::after]:[left:-50%]! [&::after]:[top:0px]! [&::after]:[position:relative]! [&::after]:[display:block]! [&::after]:[box-shadow:0_0_10px_red]! [&::after]:[transition:all_0.2s]! [&::after]:[opacity:0]! [&::after]:[transform:scaleX(0)]! [&_img]:[height:35px]! [&:hover::after]:[transform:scaleX(1)]! [&:hover::after]:[left:0]! [&:hover::after]:[opacity:1]! [&_a]:[color:white]! [&_a]:[text-decoration:none]! [&.ml-sheet:hover]:[color:white]! [&.ml-sheet:hover]:[-webkit-text-stroke:0px]! [&.ml-sheet:hover]:[text-shadow:none]! [&.ml-sheet::after]:[display:none]! [&.ml-sheet:hover::after]:[display:none]! [&.ml-sheet:hover::after]:[transform:none]! [&.ml-sheet:hover::after]:[opacity:0]! [&.ml-sheet_a]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.1),_rgba(255,_0,_0,_0.2))]! [&.ml-sheet_a]:[padding:8px_16px]! [&.ml-sheet_a]:[border-radius:6px]! [&.ml-sheet_a]:[border:1px_solid_rgba(255,_0,_0,_0.4)]! [&.ml-sheet_a]:[box-shadow:0_0_15px_rgba(255,_0,_0,_0.3)]! [&.ml-sheet_a]:[transition:all_0.3s_ease]! [&.ml-sheet_a:hover]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.2),_rgba(255,_0,_0,_0.3))]! [&.ml-sheet_a:hover]:[box-shadow:0_0_25px_rgba(255,_0,_0,_0.6)]! max-[740.01px]:[display:none]!">
              <NavLink activeStyle={active_style} to="/blogs">
                Blog
              </NavLink>
            </div>
            <div className="kdag-nav-item [&:hover]:[color:red]! [&:hover]:[-webkit-text-stroke:0px]! [&:hover]:[text-shadow:0_0_12px_red]! [font-size:1.3rem]! [margin:1rem_0]! [&::after]:[content:'']! [&::after]:[background:rgb(255,_0,_0)]! [&::after]:[border-radius:2px]! [&::after]:[height:2px]! [&::after]:[width:100%]! [&::after]:[z-index:99999]! [&::after]:[left:-50%]! [&::after]:[top:0px]! [&::after]:[position:relative]! [&::after]:[display:block]! [&::after]:[box-shadow:0_0_10px_red]! [&::after]:[transition:all_0.2s]! [&::after]:[opacity:0]! [&::after]:[transform:scaleX(0)]! [&_img]:[height:35px]! [&:hover::after]:[transform:scaleX(1)]! [&:hover::after]:[left:0]! [&:hover::after]:[opacity:1]! [&_a]:[color:white]! [&_a]:[text-decoration:none]! [&.ml-sheet:hover]:[color:white]! [&.ml-sheet:hover]:[-webkit-text-stroke:0px]! [&.ml-sheet:hover]:[text-shadow:none]! [&.ml-sheet::after]:[display:none]! [&.ml-sheet:hover::after]:[display:none]! [&.ml-sheet:hover::after]:[transform:none]! [&.ml-sheet:hover::after]:[opacity:0]! [&.ml-sheet_a]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.1),_rgba(255,_0,_0,_0.2))]! [&.ml-sheet_a]:[padding:8px_16px]! [&.ml-sheet_a]:[border-radius:6px]! [&.ml-sheet_a]:[border:1px_solid_rgba(255,_0,_0,_0.4)]! [&.ml-sheet_a]:[box-shadow:0_0_15px_rgba(255,_0,_0,_0.3)]! [&.ml-sheet_a]:[transition:all_0.3s_ease]! [&.ml-sheet_a:hover]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.2),_rgba(255,_0,_0,_0.3))]! [&.ml-sheet_a:hover]:[box-shadow:0_0_25px_rgba(255,_0,_0,_0.6)]! max-[740.01px]:[display:none]!">
              <NavLink activeStyle={active_style} to="/team">
                Team
              </NavLink>
            </div>
            <div className="kdag-nav-item [&:hover]:[color:red]! [&:hover]:[-webkit-text-stroke:0px]! [&:hover]:[text-shadow:0_0_12px_red]! [font-size:1.3rem]! [margin:1rem_0]! [&::after]:[content:'']! [&::after]:[background:rgb(255,_0,_0)]! [&::after]:[border-radius:2px]! [&::after]:[height:2px]! [&::after]:[width:100%]! [&::after]:[z-index:99999]! [&::after]:[left:-50%]! [&::after]:[top:0px]! [&::after]:[position:relative]! [&::after]:[display:block]! [&::after]:[box-shadow:0_0_10px_red]! [&::after]:[transition:all_0.2s]! [&::after]:[opacity:0]! [&::after]:[transform:scaleX(0)]! [&_img]:[height:35px]! [&:hover::after]:[transform:scaleX(1)]! [&:hover::after]:[left:0]! [&:hover::after]:[opacity:1]! [&_a]:[color:white]! [&_a]:[text-decoration:none]! [&.ml-sheet:hover]:[color:white]! [&.ml-sheet:hover]:[-webkit-text-stroke:0px]! [&.ml-sheet:hover]:[text-shadow:none]! [&.ml-sheet::after]:[display:none]! [&.ml-sheet:hover::after]:[display:none]! [&.ml-sheet:hover::after]:[transform:none]! [&.ml-sheet:hover::after]:[opacity:0]! [&.ml-sheet_a]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.1),_rgba(255,_0,_0,_0.2))]! [&.ml-sheet_a]:[padding:8px_16px]! [&.ml-sheet_a]:[border-radius:6px]! [&.ml-sheet_a]:[border:1px_solid_rgba(255,_0,_0,_0.4)]! [&.ml-sheet_a]:[box-shadow:0_0_15px_rgba(255,_0,_0,_0.3)]! [&.ml-sheet_a]:[transition:all_0.3s_ease]! [&.ml-sheet_a:hover]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.2),_rgba(255,_0,_0,_0.3))]! [&.ml-sheet_a:hover]:[box-shadow:0_0_25px_rgba(255,_0,_0,_0.6)]! max-[740.01px]:[display:none]!">
              <NavLink activeStyle={active_style} to="/alumni">
                Alumni
              </NavLink>
            </div>
            <div className="kdag-nav-item [&:hover]:[color:red]! [&:hover]:[-webkit-text-stroke:0px]! [&:hover]:[text-shadow:0_0_12px_red]! [font-size:1.3rem]! [margin:1rem_0]! [&::after]:[content:'']! [&::after]:[background:rgb(255,_0,_0)]! [&::after]:[border-radius:2px]! [&::after]:[height:2px]! [&::after]:[width:100%]! [&::after]:[z-index:99999]! [&::after]:[left:-50%]! [&::after]:[top:0px]! [&::after]:[position:relative]! [&::after]:[display:block]! [&::after]:[box-shadow:0_0_10px_red]! [&::after]:[transition:all_0.2s]! [&::after]:[opacity:0]! [&::after]:[transform:scaleX(0)]! [&_img]:[height:35px]! [&:hover::after]:[transform:scaleX(1)]! [&:hover::after]:[left:0]! [&:hover::after]:[opacity:1]! [&_a]:[color:white]! [&_a]:[text-decoration:none]! [&.ml-sheet:hover]:[color:white]! [&.ml-sheet:hover]:[-webkit-text-stroke:0px]! [&.ml-sheet:hover]:[text-shadow:none]! [&.ml-sheet::after]:[display:none]! [&.ml-sheet:hover::after]:[display:none]! [&.ml-sheet:hover::after]:[transform:none]! [&.ml-sheet:hover::after]:[opacity:0]! [&.ml-sheet_a]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.1),_rgba(255,_0,_0,_0.2))]! [&.ml-sheet_a]:[padding:8px_16px]! [&.ml-sheet_a]:[border-radius:6px]! [&.ml-sheet_a]:[border:1px_solid_rgba(255,_0,_0,_0.4)]! [&.ml-sheet_a]:[box-shadow:0_0_15px_rgba(255,_0,_0,_0.3)]! [&.ml-sheet_a]:[transition:all_0.3s_ease]! [&.ml-sheet_a:hover]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.2),_rgba(255,_0,_0,_0.3))]! [&.ml-sheet_a:hover]:[box-shadow:0_0_25px_rgba(255,_0,_0,_0.6)]! max-[740.01px]:[display:none]!">
              <NavLink activeStyle={active_style} to="/forum">
                Forum
              </NavLink>
            </div>
            {/* <div className="kdag-nav-item">
       <NavLink activeStyle={active_style} to="/certificate">
        Certificate
       </NavLink>
       </div> */}
            {!isLoggedIn && <div className="kdag-nav-item [&:hover]:[color:red]! [&:hover]:[-webkit-text-stroke:0px]! [&:hover]:[text-shadow:0_0_12px_red]! [font-size:1.3rem]! [margin:1rem_0]! [&::after]:[content:'']! [&::after]:[background:rgb(255,_0,_0)]! [&::after]:[border-radius:2px]! [&::after]:[height:2px]! [&::after]:[width:100%]! [&::after]:[z-index:99999]! [&::after]:[left:-50%]! [&::after]:[top:0px]! [&::after]:[position:relative]! [&::after]:[display:block]! [&::after]:[box-shadow:0_0_10px_red]! [&::after]:[transition:all_0.2s]! [&::after]:[opacity:0]! [&::after]:[transform:scaleX(0)]! [&_img]:[height:35px]! [&:hover::after]:[transform:scaleX(1)]! [&:hover::after]:[left:0]! [&:hover::after]:[opacity:1]! [&_a]:[color:white]! [&_a]:[text-decoration:none]! [&.ml-sheet:hover]:[color:white]! [&.ml-sheet:hover]:[-webkit-text-stroke:0px]! [&.ml-sheet:hover]:[text-shadow:none]! [&.ml-sheet::after]:[display:none]! [&.ml-sheet:hover::after]:[display:none]! [&.ml-sheet:hover::after]:[transform:none]! [&.ml-sheet:hover::after]:[opacity:0]! [&.ml-sheet_a]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.1),_rgba(255,_0,_0,_0.2))]! [&.ml-sheet_a]:[padding:8px_16px]! [&.ml-sheet_a]:[border-radius:6px]! [&.ml-sheet_a]:[border:1px_solid_rgba(255,_0,_0,_0.4)]! [&.ml-sheet_a]:[box-shadow:0_0_15px_rgba(255,_0,_0,_0.3)]! [&.ml-sheet_a]:[transition:all_0.3s_ease]! [&.ml-sheet_a:hover]:[background:linear-gradient(90deg,_rgba(255,_0,_0,_0.2),_rgba(255,_0,_0,_0.3))]! [&.ml-sheet_a:hover]:[box-shadow:0_0_25px_rgba(255,_0,_0,_0.6)]! max-[740.01px]:[display:none]!">
              <NavLink activeStyle={active_style} to="/auth">
                Register
              </NavLink>
            </div>}
            {/* <div className="kdag-nav-item">
              <Link to="#">Go Down</Link>
            </div> */}
          </div>
          <nav className="kdag-nav-mobile [&_ul]:[-webkit-font-smoothing:antialiased]! [&_ul]:[background:rgba(255,_0,_0,_0)]! [&_ul]:[list-style:none]! [&_ul]:[margin:0]! [&_ul]:[padding:0]! [&_li]:[float:left]! [&_li]:[margin:0]! [&_li]:[padding:0]! [&_li]:[position:relative]! [&_li]:[width:100%]! [&_a]:[background:rgb(0,_0,_0)]! [&_a]:[color:#8794ba]! [&_a]:[display:block]! [&_a]:[font:bold_16px/50px_sans-serif]! [&_a]:[padding:0_25px]! [&_a]:[text-align:center]! [&_a]:[text-decoration:none]! [&_a]:[-webkit-transition:all_0.25s_ease]! [&_a]:[-moz-transition:all_0.25s_ease]! [&_a]:[-ms-transition:all_0.25s_ease]! [&_a]:[-o-transition:all_0.25s_ease]! [&_a]:[transition:all_0.25s_ease]! [&_a]:[backdrop-filter:blur(5px)]! [&_a]:[border-radius:15px]! [&_a]:[box-shadow:0_0_1px_rgba(255,_255,_255,_0.508)]! [&_li:hover_a]:[background:rgba(0,_0,_0,_0.7)]! [&_li_ul]:[float:right]! [&_li_ul]:[right:0]! [&_li_ul]:[opacity:0]! [&_li_ul]:[position:absolute]! [&_li_ul]:[top:35px]! [&_li_ul]:[visibility:hidden]! [&_li_ul]:[z-index:1]! [&_li_ul]:[-webkit-transition:all_0.25s_ease]! [&_li_ul]:[-moz-transition:all_0.25s_ease]! [&_li_ul]:[-ms-transition:all_0.25s_ease]! [&_li_ul]:[-o-transition:all_0.25s_ease]! [&_li_ul]:[transition:all_0.25s_ease]! [&_li_ul]:[width:20rem]! [&_li_ul]:[box-shadow:1px_1px_15px_10px_rgba(0,_0,_0,_0.5)]! [&_li:hover_ul]:[opacity:1]! [&_li:hover_ul]:[top:50px]! [&_li:hover_ul]:[visibility:visible]! [&_li_ul_li]:[float:none]! [&_li_ul_li]:[width:100%]! [&_li_ul_li]:[color:white]! [&_li_ul_a:hover]:[background:#ffffff25]! [&_li_ul_a:hover]:[width:100%]! max-[740.01px]:[&_a]:[padding:2px]! max-[740.01px]:[&_a]:[margin-top:3px]! drop [display:none]! [text-align:right]! max-[740.01px]:[display:block]!">
            <ul className="kdag-nav-mobile-ul [&_li_ul_li_img]:[height:35px]! cf">
              <li>
              {/* drop hamburger menu icon */}
                <svg className="dropdown [.kdag-nav-mobile_&:after]:[content:'_▶']! [.kdag-nav-mobile_&:hover:after]:[content:'▼']! hamburgermenu [width:40px]! [height:40px]!" width="76" height="51" viewBox="0 0 76 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="76" height="11.7049" rx="5.85246" fill="white" fillOpacity="0.3" />
                  <rect y="39.2951" width="76" height="11.7049" rx="5.85246" fill="white" fillOpacity="0.3" />
                  <rect y="19.2295" width="76" height="11.7049" rx="5.85246" fill="white" fillOpacity="0.3" />
                  <rect y="19.2295" width="76" height="11.7049" rx="5.85246" fill="white" fillOpacity="0.3" />
                  <rect y="19.2295" width="76" height="11.7049" rx="5.85246" fill="white" fillOpacity="0.3" />
                </svg>
              {/* drop hamburger menu icon end */}


                {/* <img class="dropdown hamburgermenu" src={ham} alt="menu" /> */}

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
                  {/* <li>
          <NavLink to="/certificate">Certificate</NavLink>
          </li> */}
                  <li>
                    <NavLink to="/auth">Register</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>;
};
export default Navbar;
