import React from "react";
import Particless from "../Common/Particles/Particless";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const GoogleAuthCallback = () => {
  const location = useLocation();
  const history = useHistory();
  const [uid, setUid] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    fetch(`${process.env.REACT_APP_FETCH_URL}/user/auth/google/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => {
        if (!response.ok) {
          setIsVisible(false);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const { access_token, user_info } = data;
        localStorage.setItem("access_token", access_token);
        setUid(data.uid);

        if (data.user_exists) {
          localStorage.setItem("access_token", data.access_token);
          window.location.href = "/ml_sheet";
        } else {
          localStorage.setItem("register_user_info", JSON.stringify(user_info));
          localStorage.setItem("uid", data.uid);
          localStorage.setItem("access_token", data.access_token);
          history.push("/register");
        }
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
      });
  }, [location, history]);
  return (
    <div className="loader-container">
      <div className={`loader ${isVisible ? "" : "loader-hidden"}`}></div>
      <div className="loader-text">
        {isVisible
          ? "Wait we are signing you in..."
          : "Network response was not ok"}
      </div>
      <Particless />
    </div>
  );
};

export default GoogleAuthCallback;
