import React from "react";
import Particless from "../Common/Particles/Particless";
import { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
const GoogleAuthCallback = () => {
  const location = useLocation();
  const history = useHistory();
  const [uid, setUid] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const attemptedCode = useRef();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    // React 18 replays effects in development; authorization codes are single-use.
    if (attemptedCode.current === code) return;
    attemptedCode.current = code;
    fetch(`${import.meta.env.VITE_FETCH_URL}/user/auth/google/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code
      })
    }).then(response => {
      if (!response.ok) {
        setIsVisible(false);
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then(data => {
      const {
        access_token,
        user_info
      } = data;
      localStorage.setItem("access_token", access_token);
      setUid(data.uid);
      if (data.user_exists) {
        localStorage.setItem("access_token", data.access_token);
        window.location.href = "/register-hackathon";
      } else {
        localStorage.setItem("register_user_info", JSON.stringify(user_info));
        localStorage.setItem("uid", data.uid);
        localStorage.setItem("access_token", data.access_token);
        // history.push("/register");
        window.location.href = "/register-hackathon";
      }
    }).catch(error => {
      console.error("Error during authentication:", error);
    });
  }, [location, history]);
  return <div className="loader-container [display:flex]! [flex-direction:column]! [align-items:center]! [justify-content:center]! [min-height:100vh]! [background-color:transparent]! [padding-bottom:120px]!"><style>{"@import url(\"https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap\")\n@keyframes move {\n\t0%,\n\t49.99% {\n\t\topacity: 0;\n\t\tz-index: 1;\n\t}\n\t50%,\n\t100% {\n\t\topacity: 1;\n\t\tz-index: 5;\n\t}\n}"}</style>
      <div className={`loader [border:8px_solid_rgba(255,_255,_255,_0.1)]! [border-left-color:#fff]! [width:10rem]! [height:10rem]! [border-radius:50%]! [animation:spin_1s_linear_infinite]! ${isVisible ? "" : "loader-hidden [display:none]!"} `}></div>
      <div className="loader-text [color:#fff]! [font-size:1.5rem]! [margin-top:20px]! [text-align:center]!">
        {isVisible ? "Wait we are signing you in..." : "Network response was not ok"}
      </div>
      <Particless />
    </div>;
};
export default GoogleAuthCallback;
