import { API_BASE_URL } from "../../config/api.js";
import parityAsset0 from "../../assets/KDSH2025_cover.webp";
import React, { useEffect, useState, useContext } from "react";
import Fade from "../Common/Motion/Fade.jsx";
import Particless from "../Common/Particles/Particless";
import { toast } from "react-toastify";
import { handleSubmit } from "./useFormStates";
import useFormStates from "./useFormStates";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RegisterFormCard from "./RegisterFormCard.jsx";
import kdsh_2025 from "./../../assets/kdsh2025_logo.webp";
import show_icon from "./../../assets/show_icon.webp";
import repo1 from "./../../assets/llm_repo.webp";
import repo2 from "./../../assets/pathway_repo.webp";
import starred from "./../../assets/starred_repo.webp";
import profile_icon from "./../../assets/profile_icon.webp";
import profile_menu from "./../../assets/profile_menu.webp";
import Star from "./Star.jsx";
import { AuthContext } from "../../context/AuthContext";
import LoginPrompt from "../Resources_New/LoginPrompt";
import { Copy, Check } from "lucide-react";
import whatsapp from "./../../assets/kdsh2025_whatsapp.webp";
import discord from "./../../assets/kdsh2025_discord.webp";
import banner from "./../../assets/DataForge_big.png";
import bannerSmall from "./../../assets/DataForge_small.webp";
const RegisterPage = () => {
  const particless = React.useMemo(() => <Particless />, []);
  const {
    isLoggedIn
  } = useContext(AuthContext);
  const {
    userInfo
  } = useContext(AuthContext);
  const [successPage, setSuccessPage] = useState(false);
  const history = useHistory();
  const [showHowTo, setShowHowTo] = useState(false);
  const [registrationMode, setRegistrationMode] = useState(null);
  const [teamCode, setTeamCode] = useState("");
  const [teamCodeDisplay, setTeamCodeDisplay] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  const [checkingTeam, setCheckingTeam] = useState(false);
  const [copiedTeamCode, setCopiedTeamCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleShowHowTo = () => {
    setShowHowTo(!showHowTo);
  };
  useEffect(() => {
    if (successPage) {
      history.push("/register-success");
    }
  }, [successPage, history]);
  useEffect(() => {
    if (isLoggedIn) {
      checkUserTeam();
    }
  }, [isLoggedIn]);
  const checkUserTeam = async () => {
    setCheckingTeam(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setCheckingTeam(false);
        return;
      }
      const res = await fetch(`${API_BASE_URL}/kdsh/get_user_teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok && data.teams && data.teams.length > 0) {
        setHasTeam(true);
      }
    } catch (error) {
      console.error("Error checking team status:", error);
    } finally {
      setCheckingTeam(false);
    }
  };
  const handleTeamLeaderRegister = e => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return false;
    }
    if (!handleSubmit(firstname1, mobile1, college1, YOS1, GitHubID1)) {
      return false;
    }
    if (!team || team.trim() === "") {
      toast.error("Please enter a team name", {
        position: "top-center",
        draggable: true,
        theme: "dark"
      });
      return false;
    }
    setIsSubmitting(true);
    const formData = {
      isTeamLeader: true,
      firstname: firstname1,
      lastname: lastname1,
      gender: gender1,
      mail: mail1,
      mobile: mobile1,
      college: college1,
      degree: degree1,
      YOS: Number(YOS1),
      GitHubID: GitHubID1,
      teamName: team
    };
    toast.info("Creating your team... This may take a few moments.", {
      position: "top-center",
      autoClose: 5000,
      theme: "dark"
    });
    fetch(`${API_BASE_URL}/kdsh/check_register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(async response => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }
      return data;
    }).then(data => {
      if (data.teamCode && data.message) {
        setTeamCodeDisplay(data.teamCode);
        toast.success(data.message, {
          theme: "dark",
          autoClose: 10000
        });
      }
      checkUserTeam();
      setIsSubmitting(false);
    }).catch(error => {
      console.error("Error during registration:", error);
      const errorMessage = error.message || "Registration failed, please try again later.";
      toast.error(errorMessage, {
        position: "top-center",
        draggable: true,
        autoClose: 15000
      });
      setIsSubmitting(false);
    });
  };
  const handleJoinTeam = async e => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (!teamCode || teamCode.trim() === "") {
        toast.error("Please enter a team code", {
          position: "top-center",
          draggable: true,
          theme: "dark"
        });
        return;
      }
      if (!handleSubmit(firstname1, mobile1, college1, YOS1, GitHubID1)) {
        return;
      }
      const formData = {
        firstname: firstname1,
        lastname: lastname1,
        gender: gender1,
        mail: mail1,
        mobile: mobile1,
        college: college1,
        degree: degree1,
        YOS: Number(YOS1),
        GitHubID: GitHubID1,
        teamCode: teamCode.trim().toUpperCase()
      };
      toast.info("Joining team...", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark"
      });
      const response = await fetch(`${API_BASE_URL}/kdsh/join_team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to join team");
      }
      toast.success(data.message || "Joined team successfully", {
        theme: "dark"
      });
      await checkUserTeam();
      setSuccessPage(true);
    } catch (error) {
      console.error("Join error:", error);
      toast.error(error.message || "Failed to join team", {
        position: "top-center",
        autoClose: 15000
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const {
    firstname1,
    setFirstname1,
    lastname1,
    setLastname1,
    gender1,
    setGender1,
    mail1,
    setMail1,
    mobile1,
    setMobile1,
    college1,
    setCollege1,
    degree1,
    setDegree1,
    YOS1,
    setYOS1,
    GitHubID1,
    setGitHubID1
  } = useFormStates();
  useEffect(() => {
    setMail1(userInfo?.email);
  }, [userInfo, mail1]);
  const [team, setTeam] = useState("");
  const handleTeamName = e => {
    const value = e.target.value;

    // Always allow typing / deleting
    if (value.length > 35) {
      toast.error("Please choose a name not more than 35 characters", {
        position: "top-center",
        draggable: true,
        theme: "dark"
      });
      return;
    }
    const validNameRegex = /^[a-zA-Z0-9\s]*$/;
    if (!validNameRegex.test(value)) {
      toast.error("Team name can only contain letters, numbers and spaces", {
        position: "top-center",
        draggable: true,
        theme: "dark"
      });
      return;
    }
    setTeam(value);
  };
  const handleTeamCodeChange = e => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setTeamCode(value);
  };
  const handleKdshClick = e => {
    history.push("/");
  };
  const copyTeamCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(teamCodeDisplay);
      setCopiedTeamCode(true);
      toast.success("Team code copied to clipboard!", {
        position: "top-center",
        autoClose: 2000
      });
      setTimeout(() => setCopiedTeamCode(false), 2000);
    } catch (error) {
      toast.error("Failed to copy code");
      console.error("Copy error:", error);
    }
  };
  const handleBackToSelection = () => {
    setRegistrationMode(null);
    setTeamCodeDisplay("");
    setTeam("");
    setTeamCode("");
  };
  return <><style>{"@keyframes shimmer {\n\t0% {\n\t\tleft: -100%;\n\t}\n\n\t100% {\n\t\tleft: 200%;\n\t}\n}\ninput[type=\"number\"]::-webkit-outer-spin-button,\ninput[type=\"number\"]::-webkit-inner-spin-button {\n\t-webkit-appearance: none;\n\tmargin: 0;\n}\ninput[type=\"number\"] {\n\tappearance: textfield;\n\t-moz-appearance: textfield;\n}"}</style>
      <div className="register-container" style={{
      "--parity-asset-0": `url(${parityAsset0})`
    }}>
        <Fade top>
          <div className="register-header [.register-container_&]:[position:relative]! [.register-container_&]:[min-height:100vh]! [.register-container_&]:[width:100%]! [.register-container_&]:[display:flex]! [.register-container_&]:[flex-direction:column]! [.register-container_&]:[align-items:center]! [.register-container_&]:[justify-content:flex-start]! [.register-container_&]:[padding-top:140px]! [.register-container_&]:[box-sizing:border-box]! [.register-container_&]:[overflow:hidden]! [.register-container_&::after]:[content:'']! [.register-container_&::after]:[position:absolute]! [.register-container_&::after]:[inset:0]! [.register-container_&::after]:[z-index:-1]! max-[900.01px]:[.register-container_&]:[padding-top:100px]! max-[600.01px]:[.register-container_&]:[padding-top:80px]!">
            <div className="spacer layer1 [.register-container_.register-header_&]:[position:absolute]! [.register-container_.register-header_&]:[inset:0]! [.register-container_.register-header_&]:[background-image:var(--parity-asset-0)]! [.register-container_.register-header_&]:[background-size:cover]! [.register-container_.register-header_&]:[background-position:center]! [.register-container_.register-header_&]:[background-repeat:no-repeat]! [.register-container_.register-header_&]:[z-index:-1]!"></div>
            <div className="register-kdsh [.register-container_.register-header_&]:[font-size:clamp(48px,_6vw,_72px)]! [.register-container_.register-header_&]:[font-weight:900]! [.register-container_.register-header_&]:[letter-spacing:-0.03em]! [.register-container_.register-header_&]:[color:#ffffff]! [.register-container_.register-header_&]:[margin-bottom:30px]! [.register-container_.register-header_&]:[text-align:center]! [.register-container_.register-header_&]:[text-shadow:0_12px_40px_rgba(0,_0,_0,_0.45)]! max-[1285.01px]:[.register-container_.register-header_&]:[top:115px]! max-[1285.01px]:[.register-container_.register-header_&]:[left:34%]! max-[1285.01px]:[.register-container_.register-header_&]:[padding:5px_25px]! max-[1060.01px]:[.register-container_.register-header_&]:[top:100px]! max-[1060.01px]:[.register-container_.register-header_&]:[left:32%]! max-[1060.01px]:[.register-container_.register-header_&]:[font-size:45px]! max-[1060.01px]:[.register-container_.register-header_&]:[padding:5px_25px]! max-[880.01px]:[.register-container_.register-header_&]:[top:90px]! max-[880.01px]:[.register-container_.register-header_&]:[left:26%]! max-[880.01px]:[.register-container_.register-header_&]:[font-size:45px]! max-[880.01px]:[.register-container_.register-header_&]:[padding:5px_25px]! max-[750.01px]:[.register-container_.register-header_&]:[top:95px]! max-[750.01px]:[.register-container_.register-header_&]:[left:24%]! max-[750.01px]:[.register-container_.register-header_&]:[font-size:45px]! max-[750.01px]:[.register-container_.register-header_&]:[padding:5px_25px]! max-[700.01px]:[.register-container_.register-header_&]:[top:95px]! max-[700.01px]:[.register-container_.register-header_&]:[left:22%]! max-[700.01px]:[.register-container_.register-header_&]:[font-size:45px]! max-[700.01px]:[.register-container_.register-header_&]:[padding:5px_25px]! max-[575.01px]:[.register-container_.register-header_&]:[top:85px]! max-[575.01px]:[.register-container_.register-header_&]:[left:14%]! max-[575.01px]:[.register-container_.register-header_&]:[font-size:45px]! max-[575.01px]:[.register-container_.register-header_&]:[padding:5px_25px]! max-[500.01px]:[.register-container_.register-header_&]:[top:85px]! max-[500.01px]:[.register-container_.register-header_&]:[left:12%]! max-[500.01px]:[.register-container_.register-header_&]:[font-size:45px]! max-[500.01px]:[.register-container_.register-header_&]:[padding:5px_25px]! max-[500.01px]:[.register-container_.register-header_&_img]:[height:100px]! max-[460.01px]:[.register-container_.register-header_&]:[top:80px]! max-[460.01px]:[.register-container_.register-header_&]:[left:10%]! max-[460.01px]:[.register-container_.register-header_&]:[font-size:35px]! max-[460.01px]:[.register-container_.register-header_&]:[padding:5px_25px]! max-[395.01px]:[.register-container_.register-header_&]:[top:80px]! max-[395.01px]:[.register-container_.register-header_&]:[left:4%]! max-[395.01px]:[.register-container_.register-header_&]:[font-size:35px]! max-[395.01px]:[.register-container_.register-header_&]:[padding:5px_25px]!">DataForge 2026</div>
            <div className="kdsh_banner [max-width:900px]! [margin:0_auto_3rem_auto]! [padding:0]! [&_img]:[width:100%]! [&_img]:[height:auto]! [&_img]:[display:block]! [&_img]:[border-radius:20px]! max-[768.01px]:[padding:0_16px]!">
              <picture>

                <source media="(max-width: 767px)" srcSet={bannerSmall} />

                <img src={banner} alt="DaraForge Banner" style={{
                width: "100%",
                height: "auto"
              }} />
              </picture>
            </div>

            <div className="register-kdsh-desc [.register-container_.register-header_&]:[max-width:900px]! [.register-container_.register-header_&]:[margin:0_auto]! [.register-container_.register-header_&]:[padding:40px]! [.register-container_.register-header_&]:[padding-top:20px]! [.register-container_.register-header_&]:[margin-bottom:1rem]! [.register-container_.register-header_&]:[font-size:18px]! [.register-container_.register-header_&]:[line-height:1.7]! [.register-container_.register-header_&]:[font-weight:500]! [.register-container_.register-header_&]:[color:#ffffff]! [.register-container_.register-header_&]:[text-align:justify]! [.register-container_.register-header_&]:[background:rgba(255,_255,_255,_0.08)]! [.register-container_.register-header_&]:[backdrop-filter:blur(25px)]! [.register-container_.register-header_&]:[-webkit-backdrop-filter:blur(12px)]! [.register-container_.register-header_&]:[border-radius:20px]! [.register-container_.register-header_&]:[border:1px_solid_rgba(255,_255,_255,_0.18)]! [.register-container_.register-header_&_ul]:[margin-top:30px]! [.register-container_.register-header_&_ul]:[padding:0]! [.register-container_.register-header_&_ul]:[list-style:none]! [.register-container_.register-header_&_ul]:[display:flex]! [.register-container_.register-header_&_ul]:[gap:20px]! [.register-container_.register-header_&_ul]:[justify-content:space-evenly]! [.register-container_.register-header_&_ul]:[flex-wrap:wrap]! [.register-container_.register-header_&_ul_li]:[position:relative]! [.register-container_.register-header_&_ul_li]:[padding:12px_56px]! [.register-container_.register-header_&_ul_li]:[border-radius:12px]! [.register-container_.register-header_&_ul_li]:[font-weight:700]! [.register-container_.register-header_&_ul_li]:[font-size:16px]! [.register-container_.register-header_&_ul_li]:[color:#ffffff]! [.register-container_.register-header_&_ul_li]:[cursor:pointer]! [.register-container_.register-header_&_ul_li]:[background:rgba(255,_255,_255,_0.1)]! [.register-container_.register-header_&_ul_li]:[border:1px_solid_rgba(255,_255,_255,_0.3)]! [.register-container_.register-header_&_ul_li]:[transition:transform_0.25s_ease,_box-shadow_0.25s_ease]! [.register-container_.register-header_&_ul_li]:[overflow:hidden]! [.register-container_.register-header_&_ul_li:hover]:[transform:scale(1.03)]! [.register-container_.register-header_&_ul_li:hover]:[border-color:rgba(255,_255,_255,_0.6)]! [.register-container_.register-header_&_ul_li::before]:[content:'']! [.register-container_.register-header_&_ul_li::before]:[position:absolute]! [.register-container_.register-header_&_ul_li::before]:[top:0]! [.register-container_.register-header_&_ul_li::before]:[left:-100%]! [.register-container_.register-header_&_ul_li::before]:[width:60%]! [.register-container_.register-header_&_ul_li::before]:[height:100%]! [.register-container_.register-header_&_ul_li::before]:[background:linear-gradient(120deg,_transparent,_rgba(255,_255,_255,_0.35),_transparent)]! [.register-container_.register-header_&_ul_li::before]:[animation:shimmer_2.5s_infinite]! max-[900.01px]:[.register-container_.register-header_&]:[margin:0_20px]! max-[900.01px]:[.register-container_.register-header_&]:[padding:28px]! max-[900.01px]:[.register-container_.register-header_&]:[font-size:16px]! max-[900.01px]:[.register-container_.register-header_&_ul]:[justify-content:center]! max-[1285.01px]:[.register-container_.register-header_&]:[padding:20px]! max-[1285.01px]:[.register-container_.register-header_&]:[font-weight:600]! max-[1285.01px]:[.register-container_.register-header_&]:[top:265px]! max-[1285.01px]:[.register-container_.register-header_&]:[margin:0_100px]! max-[1060.01px]:[.register-container_.register-header_&]:[padding:20px]! max-[1060.01px]:[.register-container_.register-header_&]:[font-weight:600]! max-[1060.01px]:[.register-container_.register-header_&]:[top:240px]! max-[1060.01px]:[.register-container_.register-header_&]:[margin:0_100px]! max-[880.01px]:[.register-container_.register-header_&]:[padding:20px]! max-[880.01px]:[.register-container_.register-header_&]:[font-weight:600]! max-[880.01px]:[.register-container_.register-header_&]:[top:240px]! max-[880.01px]:[.register-container_.register-header_&]:[margin:0_90px]! max-[750.01px]:[.register-container_.register-header_&]:[padding:20px]! max-[750.01px]:[.register-container_.register-header_&]:[font-weight:600]! max-[750.01px]:[.register-container_.register-header_&]:[top:250px]! max-[750.01px]:[.register-container_.register-header_&]:[margin:0_90px]! max-[700.01px]:[.register-container_.register-header_&]:[padding:20px]! max-[700.01px]:[.register-container_.register-header_&]:[font-weight:600]! max-[700.01px]:[.register-container_.register-header_&]:[top:250px]! max-[700.01px]:[.register-container_.register-header_&]:[margin:0_50px]! max-[700.01px]:[.register-container_.register-header_&]:[font-size:18px]! max-[575.01px]:[.register-container_.register-header_&]:[padding:20px]! max-[575.01px]:[.register-container_.register-header_&]:[font-weight:600]! max-[575.01px]:[.register-container_.register-header_&]:[top:220px]! max-[575.01px]:[.register-container_.register-header_&]:[margin:0_40px]! max-[575.01px]:[.register-container_.register-header_&]:[font-size:16px]! max-[500.01px]:[.register-container_.register-header_&]:[padding:20px]! max-[500.01px]:[.register-container_.register-header_&]:[font-weight:600]! max-[500.01px]:[.register-container_.register-header_&]:[top:200px]! max-[500.01px]:[.register-container_.register-header_&]:[margin:0_40px]! max-[500.01px]:[.register-container_.register-header_&]:[font-size:16px]! max-[460.01px]:[.register-container_.register-header_&]:[padding:20px]! max-[460.01px]:[.register-container_.register-header_&]:[font-weight:600]! max-[460.01px]:[.register-container_.register-header_&]:[top:200px]! max-[460.01px]:[.register-container_.register-header_&]:[margin:0_30px]! max-[460.01px]:[.register-container_.register-header_&]:[font-size:16px]! max-[395.01px]:[.register-container_.register-header_&]:[padding:20px]! max-[395.01px]:[.register-container_.register-header_&]:[font-weight:600]! max-[395.01px]:[.register-container_.register-header_&]:[top:200px]! max-[395.01px]:[.register-container_.register-header_&]:[margin:0_20px]! max-[395.01px]:[.register-container_.register-header_&]:[font-size:16px]!">
              <p>
                <strong>Kharagpur Data Analytics Group (KDAG)</strong>, IIT Kharagpur, presents {" "}
                <strong>DataForge 2026</strong>, a data science and analytics hackathon, sponsored by
                Pathway and Rime, designed to challenge participants with real-world data science and machine
                learning problems.
              </p>

              <p>
                Compete for a {" "}<strong>₹3L+ prize pool</strong> in cash prizes and exciting
                goodies!
              </p>

              {/* <p>
        Why participate? <br/>
        <strong>Prizes Worth ₹4,00,000. </strong><br/>
        <ul>
          <li><strong>Winner:</strong> ₹2,00,000</li>
          <li><strong>Runner-up:</strong> ₹1,25,000</li>
          <li><strong>Second Runner-up:</strong> ₹75,000</li>
        </ul>
        Backed by industry leaders including Pathway (Title Sponser) and TrueFoundry (Tech Platform Sponser) <br />
        Exposure through national media partners and India's largest techno-management fest.
        </p> */}

              <p>
                <strong>Registration deadline: 2nd September 2026 11:59 PM</strong>
              </p>

              <p>
                For more details about DataForge 2026, visit our {" "}
                <a className="kdsh-unstop-link [color:#FFD700]! [font-weight:bolder]! [&:hover]:[color:#FFD700]! [&:hover]:[text-decoration:underline]!" href="https://unstop.com/p/dataforge-2026-iit-kharagpur-1739346" target="_blank" rel="noreferrer noopener">
                  Unstop Page
                </a>.
              </p>

              <p>
                To participate, please fill in your details in the form provided
                below.
              </p>

              <p style={{
              color: "#FFD700",
              borderTop: "solid 2px white",
              paddingTop: "45px"
            }}>
                <strong>
                  Do check out and star Pathway's new repository! It's about a
                  a reasoning model that combines in-context learning through
                  evolving recurrent memory with iterative reasoning in a structured,
                  continuous latent space.
                </strong>
              </p>

              <ul>
                <li>
                  <a className="kdsh-link" href="https://github.com/pathwaycom/arc-task-gen" target="_blank" rel="noreferrer noopener" style={{
                  cursor: "pointer"
                }}>
                    ARC-TASK-GEN
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Fade>
        {/* <Star /> */}
        <Fade left>
          <div className="register-form [border:solid_rgba(255,_255,_255,_0.05)_2px]! [border-top:5px_solid_#1c1cf0]! [border-radius:1.2rem]! [background:rgb(21,_21,_21)]! [max-width:900px]! [padding:25px]! [width:80%]! [margin-bottom:150px]! [margin-top:75px]! [position:relative]! [&_input]:[border-radius:0px]! [&_input]:[border:0px]! max-[1110.01px]:[margin-top:150px]! max-[1060.01px]:[margin-top:150px]! max-[940.01px]:[margin-top:150px]! max-[880.01px]:[margin-top:150px]! max-[790.01px]:[margin-top:150px]! max-[750.01px]:[margin-top:150px]! max-[645.01px]:[margin-top:150px]! max-[515.01px]:[&_input]:[width:265px]! max-[480.01px]:[&_input]:[width:240px]! max-[460.01px]:[&_input]:[height:40px]! max-[450.01px]:[&_input]:[width:210px]! max-[435.01px]:[margin-top:150px]! max-[400.01px]:[&_input]:[width:200px]! max-[395.01px]:[margin-top:150px]! max-[386.01px]:[&_input]:[width:190px]! max-[375.01px]:[&_input]:[width:180px]! max-[360.01px]:[&_input]:[width:170px]! max-[350.01px]:[&_input]:[width:160px]! max-[340.01px]:[&_input]:[width:150px]! max-[325.01px]:[&_input]:[width:130px]!">
            <div style={{
            textAlign: "center",
            padding: "40px 20px"
          }}>
              <h2 style={{
              marginBottom: "20px",
              color: "#fff"
            }}>
                Registrations have moved to Unstop
              </h2>
              <p style={{
              marginBottom: "25px",
              color: "#ccc"
            }}>
                Registrations for DataForge 2026 are now closed on our website.
              </p>
              <a className="kdsh-unstop-link [color:#FFD700]! [font-weight:bolder]! [&:hover]:[color:#FFD700]! [&:hover]:[text-decoration:underline]!" href="https://unstop.com/p/dataforge-2026-iit-kharagpur-1739346" target="_blank" rel="noreferrer noopener">
                Continue to Unstop
              </a>
            </div>
            {/* Registration flow temporarily disabled; retained below for future reuse. */}
            {false && <>
              {registrationMode && <button className="register-back-button [position:absolute]! [top:20px]! [left:20px]! [z-index:10]! [background:rgba(255,_255,_255,_0.1)]! [border:1px_solid_rgba(255,_255,_255,_0.3)]! [border-radius:50%]! [padding:12px_12px]! [color:#ffffff]! [font-size:20px]! [font-weight:600]! [cursor:pointer]! [transition:all_0.3s_ease]! [display:flex]! [align-items:center]! [justify-content:center]! [min-width:40px]! [height:40px]! [&:hover]:[background:rgba(255,_255,_255,_0.2)]! [&:hover]:[border-color:rgba(255,_255,_255,_0.5)]! [&:hover]:[transform:translateX(-1px)]! [&:active]:[transform:translateX(-5px)]! max-[700.01px]:[top:15px]! max-[700.01px]:[left:15px]! max-[700.01px]:[padding:8px_12px]! max-[700.01px]:[font-size:18px]! max-[700.01px]:[min-width:36px]! max-[700.01px]:[height:36px]!" type="button" onClick={handleBackToSelection} aria-label="Back to selection">
                  ←
                </button>}
              {checkingTeam ? <div style={{
              padding: "40px",
              textAlign: "center"
            }}>
                  <h2>Checking team status...</h2>
                </div> : !registrationMode ? hasTeam ? <div style={{
              textAlign: "center",
              padding: "40px 20px"
            }}>
                    <h2 style={{
                marginBottom: "20px",
                color: "#fff"
              }}>You are already part of a team!</h2>
                    <p style={{
                marginBottom: "30px",
                color: "#ccc"
              }}>
                      Visit the Manage Team dashboard to view your team details or make changes.
                    </p>
                    <button className="register-form-submit [background:transparent]! [min-width:300px]! [border:none]! [display:flex]! [justify-content:center]! [align-items:center]! [&_p]:[text-align:center]! [&_p]:[background-image:linear-gradient(to_right,_#1c1cf0,_#3572c3,_#3572c3,_#1c1cf0)]! [&_p]:[padding:10px]! [&_p]:[background-size:300%_100%]! [&_p]:[width:100%]! [&_p]:[color:white]! [&_p]:[border-radius:30px]! [&_p]:[border:none]! [&_p]:[transition:0.3s]! [&_p:hover]:[background-position:100%_0]! [&_p:hover]:[transform:scale(1.05)]! max-[700.01px]:[min-width:350px]! max-[575.01px]:[min-width:320px]! max-[515.01px]:[min-width:280px]! max-[480.01px]:[min-width:100%]! max-[460.01px]:[min-width:100%]! max-[400.01px]:[min-width:100%]! max-[375.01px]:[min-width:100%]! max-[325.01px]:[min-width:100%]!" type="button" onClick={() => history.push("/manage-team")} style={{
                minWidth: "",
                margin: "0 auto"
              }}>
                      <p>Manage Team</p>
                    </button>
                    <div className="important-note2 [margin-top:24px]! [padding:14px_18px]! [text-align:center]! [line-height:1.55]! [color:#e6ecff]! [font-size:20px]! [border-radius:12px]! [border:1px_solid_rgba(120,_160,_255,_0.25)]! [max-width:820px]! [margin-left:auto]! [margin-right:auto]! [transition:box-shadow_0.25s_ease,_border-color_0.25s_ease]! [&_strong]:[color:#8fb3ff]! [&_strong]:[font-weight:800]! [&_strong]:[font-size:17px]! max-[820.01px]:[font-size:14px]! max-[820.01px]:[padding:12px_14px]! max-[820.01px]:[max-width:92%]! max-[520.01px]:[font-size:13.5px]! max-[520.01px]:[line-height:1.45]! max-[520.01px]:[padding:10px_12px]! max-[520.01px]:[border-radius:10px]!">
                      <strong>Important:</strong> After all Members have joined, Team Leader must finalize the team on the&nbsp;
                      <span className="important-note2-link [color:#8fb3ff]! [cursor:pointer]! [font-weight:700]! [text-decoration:underline]! [text-underline-offset:3px]! [transition:color_0.25s_ease,_text-shadow_0.25s_ease]! max-[520.01px]:[display:inline-block]!" onClick={() => history.push("/manage-team")}>
                        Manage Team
                      </span>{" "}
                      page. Your team will only appear on Unstop after finalization.
                    </div>
                  </div> : <div>
                    <h1 style={{
                textShadow: "0 0 5px #1c1cf0, 0 0 10px #1c1cf0",
                marginBottom: "25px",
                textAlign: "center"
              }}>
                      Choose Registration Type
                    </h1>
                    <div style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap"
              }}>
                      <button className="register-form-submit [background:transparent]! [border:none]! [display:flex]! [justify-content:center]! [align-items:center]! [&_p]:[text-align:center]! [&_p]:[background-image:linear-gradient(to_right,_#1c1cf0,_#3572c3,_#3572c3,_#1c1cf0)]! [&_p]:[padding:10px]! [&_p]:[background-size:300%_100%]! [&_p]:[width:100%]! [&_p]:[color:white]! [&_p]:[border-radius:30px]! [&_p]:[border:none]! [&_p]:[transition:0.3s]! [&_p:hover]:[background-position:100%_0]! [&_p:hover]:[transform:scale(1.05)]! max-[700.01px]:[min-width:350px]! max-[575.01px]:[min-width:320px]! max-[515.01px]:[min-width:280px]! max-[480.01px]:[min-width:100%]! max-[460.01px]:[min-width:100%]! max-[400.01px]:[min-width:100%]! max-[375.01px]:[min-width:100%]! max-[325.01px]:[min-width:100%]!" type="button" onClick={() => {
                  if (!isLoggedIn) {
                    setShowLoginPrompt(true);
                    return;
                  }
                  setRegistrationMode("leader");
                }} style={{
                  minWidth: "300px"
                }}>
                        <p>Register as Team Leader</p>
                      </button>
                      <button className="register-form-submit [background:transparent]! [border:none]! [display:flex]! [justify-content:center]! [align-items:center]! [&_p]:[text-align:center]! [&_p]:[background-image:linear-gradient(to_right,_#1c1cf0,_#3572c3,_#3572c3,_#1c1cf0)]! [&_p]:[padding:10px]! [&_p]:[background-size:300%_100%]! [&_p]:[width:100%]! [&_p]:[color:white]! [&_p]:[border-radius:30px]! [&_p]:[border:none]! [&_p]:[transition:0.3s]! [&_p:hover]:[background-position:100%_0]! [&_p:hover]:[transform:scale(1.05)]! max-[700.01px]:[min-width:350px]! max-[575.01px]:[min-width:320px]! max-[515.01px]:[min-width:280px]! max-[480.01px]:[min-width:100%]! max-[460.01px]:[min-width:100%]! max-[400.01px]:[min-width:100%]! max-[375.01px]:[min-width:100%]! max-[325.01px]:[min-width:100%]!" type="button" onClick={() => {
                  if (!isLoggedIn) {
                    setShowLoginPrompt(true);
                    return;
                  }
                  setRegistrationMode("member");
                }} style={{
                  minWidth: "300px"
                }}>
                        <p>Join a Team with Team Code</p>
                      </button>
                    </div>
                    <div className="important-note2 [margin-top:24px]! [padding:14px_18px]! [text-align:center]! [line-height:1.55]! [color:#e6ecff]! [font-size:20px]! [border-radius:12px]! [border:1px_solid_rgba(120,_160,_255,_0.25)]! [max-width:820px]! [margin-left:auto]! [margin-right:auto]! [transition:box-shadow_0.25s_ease,_border-color_0.25s_ease]! [&_strong]:[color:#8fb3ff]! [&_strong]:[font-weight:800]! [&_strong]:[font-size:17px]! max-[820.01px]:[font-size:14px]! max-[820.01px]:[padding:12px_14px]! max-[820.01px]:[max-width:92%]! max-[520.01px]:[font-size:13.5px]! max-[520.01px]:[line-height:1.45]! max-[520.01px]:[padding:10px_12px]! max-[520.01px]:[border-radius:10px]!">
                      <strong>Important:</strong> After all Team Members have joined, Team Leader must review and confirm your team details on the&nbsp;
                      <span className="important-note2-link [color:#8fb3ff]! [cursor:pointer]! [font-weight:700]! [text-decoration:underline]! [text-underline-offset:3px]! [transition:color_0.25s_ease,_text-shadow_0.25s_ease]! max-[520.01px]:[display:inline-block]!" onClick={() => history.push("/manage-team")}>
                        Manage Team
                      </span>{" "}
                      page to complete your registration. Your team will only appear on Unstop after finalization.
                    </div>
                  </div> : registrationMode === "leader" ? <form onSubmit={handleTeamLeaderRegister}>
                  <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                    <h1 style={{
                  textShadow: "0 0 5px #1c1cf0, 0 0 10px #1c1cf0",
                  marginBottom: "25px"
                }}>
                      Register as Team Leader
                    </h1>
                    <br />
                    {teamCodeDisplay ? <div style={{
                  background: "rgba(0, 255, 17, 0.1)",
                  border: "2px solid #00ff11",
                  borderRadius: "10px",
                  padding: "20px",
                  marginBottom: "30px",
                  textAlign: "center",
                  width: "100%"
                }}>
                        <h2 style={{
                    color: "#00ff11",
                    marginBottom: "10px"
                  }}>
                          Team Created Successfully!
                        </h2>
                        <p style={{
                    color: "white",
                    marginBottom: "15px"
                  }}>
                          Your Team Code:
                        </p>
                        <div className="team-code-display [display:flex]! [align-items:center]! [justify-content:center]! [gap:15px]! [margin-bottom:15px]! max-[768.01px]:[flex-direction:column]!">
                          <div style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#00ff11",
                      letterSpacing: "5px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      fontFamily: "monospace"
                    }}>
                            {teamCodeDisplay}
                          </div>
                          <button type="button" onClick={copyTeamCodeToClipboard} style={{
                      background: "rgba(0, 255, 17, 0.2)",
                      border: "1px solid #00ff11",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#00ff11",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
                    }} onMouseEnter={e => {
                      e.target.style.background = "rgba(0, 255, 17, 0.3)";
                    }} onMouseLeave={e => {
                      e.target.style.background = "rgba(0, 255, 17, 0.2)";
                    }}>
                            {copiedTeamCode ? <>
                                <Check size={16} />
                                <span>Copied</span>
                              </> : <>
                                <Copy size={16} />
                                <span>Copy</span>
                              </>}
                          </button>
                        </div>
                        <p style={{
                    color: "white",
                    fontSize: "14px"
                  }}>

                          Share this code with your teammates so they can join your team.
                        </p>
                        <p style={{
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "15px"
                  }}>
                          Join the WhatsApp Group for regular updates!
                        </p>
                        <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "15px"
                  }}>
                          <a href="https://chat.whatsapp.com/BZZm1oRtnQ4FK1MYZbFNcQ" target="_blank" rel="noreferrer noopener" style={{
                      transition: "transform 0.3s ease"
                    }} onMouseEnter={e => {
                      e.target.style.transform = "scale(1.1)";
                    }} onMouseLeave={e => {
                      e.target.style.transform = "scale(1)";
                    }}>
                            <img src={whatsapp} alt="whatsapp" style={{
                        height: "50px",
                        cursor: "pointer"
                      }} />
                          </a>
                          {/* <a
              href="https://discord.gg/fBfvXCTQF"
              target="_blank"
              rel="noreferrer noopener"
              style={{
              transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              }}
              >
              <img src={discord} alt="discord" style={{ height: "50px", cursor: "pointer" }} />
              </a> */}
                        </div>
                        <div className="important-note2 [padding:14px_18px]! [text-align:center]! [line-height:1.55]! [color:#e6ecff]! [font-size:20px]! [border-radius:12px]! [border:1px_solid_rgba(120,_160,_255,_0.25)]! [max-width:820px]! [margin-left:auto]! [margin-right:auto]! [transition:box-shadow_0.25s_ease,_border-color_0.25s_ease]! [&_strong]:[color:#8fb3ff]! [&_strong]:[font-weight:800]! [&_strong]:[font-size:17px]! max-[820.01px]:[font-size:14px]! max-[820.01px]:[padding:12px_14px]! max-[820.01px]:[max-width:92%]! max-[520.01px]:[font-size:13.5px]! max-[520.01px]:[line-height:1.45]! max-[520.01px]:[padding:10px_12px]! max-[520.01px]:[border-radius:10px]!" style={{
                    marginTop: "20px"
                  }}>
                          <strong>Important Next Step:</strong> After all Members have joined your team, you MUST finalize your team on the{" "}
                          <span className="important-note2-link [color:#8fb3ff]! [cursor:pointer]! [font-weight:700]! [text-decoration:underline]! [text-underline-offset:3px]! [transition:color_0.25s_ease,_text-shadow_0.25s_ease]! max-[520.01px]:[display:inline-block]!" onClick={() => history.push("/manage-team")}>
                            Manage Team
                          </span>{" "}
                          to complete your registration. Your team will only appear on Unstop after finalization.
                        </div>
                      </div> : <div>
                        <div className="register-form-details-special [color:white]! [display:flex]! [align-items:center]! [font-weight:600]! [position:relative]! [margin-bottom:30px]! [font-size:18px]! [padding-left:90px]! [&_input]:[border-bottom:1px_rgba(255,_255,_255,_0.2)_solid]! [&_input:focus]:[box-shadow:none]! [&_input:focus]:[outline:none]! [&_input:focus]:[border-bottom:1px_#1c1cf0_solid]! [&_input:focus]:[transition:border-bottom-color_0.25s_ease]! max-[790.01px]:[&_#header]:[display:none]! max-[700.01px]:[padding-left:70px]! max-[575.01px]:[padding-left:40px]! max-[515.01px]:[padding-left:30px]! max-[480.01px]:[padding-left:30px]! max-[400.01px]:[padding-left:10px]! max-[375.01px]:[padding-left:15px]!">
                          <div id="header">Team Name</div>
                          <div style={{
                      width: "10px"
                    }}></div>
                          <input type="text" name="name" placeholder="Team Name" required onChange={handleTeamName} value={team} />
                        </div>

                        <div className="register-form-details [color:white]! [font-weight:600]! [position:relative]! [margin-bottom:10px]! [font-size:18px]! [padding-left:90px]! max-[700.01px]:[padding-left:60px]! max-[575.01px]:[padding-left:30px]! max-[515.01px]:[padding-left:20px]! max-[480.01px]:[padding-left:10px]! max-[460.01px]:[padding-left:20px]! max-[400.01px]:[padding-left:5px]!">
                          Team Leader Details
                        </div>
                        <RegisterFormCard firstname={firstname1} setFirstname={setFirstname1} lastname={lastname1} setLastname={setLastname1} gender={gender1} setGender={setGender1} mail={mail1} setMail={setMail1} mobile={mobile1} setMobile={setMobile1} college={college1} setCollege={setCollege1} degree={degree1} setDegree={setDegree1} YOS={YOS1} setYOS={setYOS1} GitHubID={GitHubID1} setGitHubID={setGitHubID1} disabled={true} />
                        <div style={{
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                          <button className="register-form-submit [background:transparent]! [min-width:300px]! [border:none]! [display:flex]! [justify-content:center]! [align-items:center]! [&_p]:[text-align:center]! [&_p]:[background-image:linear-gradient(to_right,_#1c1cf0,_#3572c3,_#3572c3,_#1c1cf0)]! [&_p]:[padding:10px]! [&_p]:[background-size:300%_100%]! [&_p]:[width:100%]! [&_p]:[color:white]! [&_p]:[border-radius:30px]! [&_p]:[border:none]! [&_p]:[transition:0.3s]! [&_p:hover]:[background-position:100%_0]! [&_p:hover]:[transform:scale(1.05)]! max-[700.01px]:[min-width:350px]! max-[575.01px]:[min-width:320px]! max-[515.01px]:[min-width:280px]! max-[480.01px]:[min-width:100%]! max-[460.01px]:[min-width:100%]! max-[400.01px]:[min-width:100%]! max-[375.01px]:[min-width:100%]! max-[325.01px]:[min-width:100%]!" type="submit" disabled={isSubmitting}>
                            <p>{isSubmitting ? "Creating..." : "Create Team"}</p>
                          </button>
                        </div>
                      </div>}
                  </div>
                </form> : <form onSubmit={handleJoinTeam}>
                  <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                    <h1 style={{
                  textShadow: "0 0 5px #1c1cf0, 0 0 10px #1c1cf0",
                  marginBottom: "25px"
                }}>
                      Join a Team
                    </h1>
                    <br />
                    <div className="register-form-details-special [color:white]! [display:flex]! [align-items:center]! [font-weight:600]! [position:relative]! [margin-bottom:30px]! [font-size:18px]! [padding-left:90px]! [&_input]:[border-bottom:1px_rgba(255,_255,_255,_0.2)_solid]! [&_input:focus]:[box-shadow:none]! [&_input:focus]:[outline:none]! [&_input:focus]:[border-bottom:1px_#1c1cf0_solid]! [&_input:focus]:[transition:border-bottom-color_0.25s_ease]! max-[790.01px]:[&_#header]:[display:none]! max-[700.01px]:[padding-left:70px]! max-[575.01px]:[padding-left:40px]! max-[515.01px]:[padding-left:30px]! max-[480.01px]:[padding-left:30px]! max-[400.01px]:[padding-left:10px]! max-[375.01px]:[padding-left:15px]!">
                      <div id="header">Team Code</div>
                      <div style={{
                    width: "10px"
                  }}></div>
                      <input type="text" name="teamCode" placeholder="Enter Team Code" required onChange={handleTeamCodeChange} value={teamCode} maxLength={8} style={{
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontFamily: "monospace"
                  }} />
                    </div>

                    <div className="register-form-details [color:white]! [font-weight:600]! [position:relative]! [margin-bottom:10px]! [font-size:18px]! [padding-left:90px]! max-[700.01px]:[padding-left:60px]! max-[575.01px]:[padding-left:30px]! max-[515.01px]:[padding-left:20px]! max-[480.01px]:[padding-left:10px]! max-[460.01px]:[padding-left:20px]! max-[400.01px]:[padding-left:5px]!">
                      Your Details
                    </div>
                    <RegisterFormCard firstname={firstname1} setFirstname={setFirstname1} lastname={lastname1} setLastname={setLastname1} gender={gender1} setGender={setGender1} mail={mail1} setMail={setMail1} mobile={mobile1} setMobile={setMobile1} college={college1} setCollege={setCollege1} degree={degree1} setDegree={setDegree1} YOS={YOS1} setYOS={setYOS1} GitHubID={GitHubID1} setGitHubID={setGitHubID1} disabled={true} />
                    <div style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                      <button className="register-form-submit [background:transparent]! [min-width:300px]! [border:none]! [display:flex]! [justify-content:center]! [align-items:center]! [&_p]:[text-align:center]! [&_p]:[background-image:linear-gradient(to_right,_#1c1cf0,_#3572c3,_#3572c3,_#1c1cf0)]! [&_p]:[padding:10px]! [&_p]:[background-size:300%_100%]! [&_p]:[width:100%]! [&_p]:[color:white]! [&_p]:[border-radius:30px]! [&_p]:[border:none]! [&_p]:[transition:0.3s]! [&_p:hover]:[background-position:100%_0]! [&_p:hover]:[transform:scale(1.05)]! max-[700.01px]:[min-width:350px]! max-[575.01px]:[min-width:320px]! max-[515.01px]:[min-width:280px]! max-[480.01px]:[min-width:100%]! max-[460.01px]:[min-width:100%]! max-[400.01px]:[min-width:100%]! max-[375.01px]:[min-width:100%]! max-[325.01px]:[min-width:100%]!" type="submit" disabled={isSubmitting}>
                        <p>{isSubmitting ? "Joining..." : "Join Team"}</p>
                      </button>
                    </div>
                  </div>
                </form>}
            </>}
          </div>
        </Fade>
        <div className="register-star-guide-wrap [max-width:900px]! [width:80%]! [margin:0_auto_150px]!">
          <button type="button" className="register-star-toggle font-[Oswald,sans-serif]! [width:100%]! [padding:18px_22px]! [border:1px_solid_rgba(255,_255,_255,_0.2)]! [border-radius:14px]! [background:rgba(24,_24,_24,_0.9)]! [color:#fff]! [font-size:1.1rem]! [font-weight:700]! [display:flex]! [align-items:center]! [justify-content:space-between]! [cursor:pointer]! [transition:all_0.25s_ease]! [&:hover]:[border-color:rgba(255,_255,_255,_0.4)]! [&:hover]:[transform:translateY(-1px)]!" onClick={handleShowHowTo}>
            <span>How to star a repository</span>
            <span className="register-star-toggle-icon [font-size:1.5rem]! [line-height:1]! [color:#ffd700]!">{showHowTo ? "▾" : "▸"}</span>
          </button>
          {showHowTo && <Star />}
        </div>
      </div>
      {particless}
      <LoginPrompt open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} message="Login to our website to register" />
    </>;
};
export default RegisterPage;
