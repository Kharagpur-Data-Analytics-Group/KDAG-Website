import {useState, useEffect} from "react";
import Particless from "../Common/Particles/Particless";
import { useLocation, useHistory } from "react-router-dom";

const loaderStyle = {
  animation: "spin 1s linear infinite",
  border: "8px solid #ffffff1a",
  borderLeftColor: "#fff",
  borderRadius: "50%",
  height: "10rem",
  width: "10rem",
};

const GoogleAuthCallback = () => {
  const location = useLocation();
  const history = useHistory();
  const [uid, setUid] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    fetch(`${import.meta.env.VITE_FETCH_URL}/user/auth/google/callback`, {
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
        console.log(user_info)
        localStorage.setItem("access_token", access_token);
        setUid(data.uid);

        if (data.user_exists) {
          localStorage.setItem("access_token", data.access_token);
          window.location.href = "/register-kdsh";
        } else {
          localStorage.setItem("register_user_info", JSON.stringify(user_info));
          localStorage.setItem("uid", data.uid);
          localStorage.setItem("access_token", data.access_token);
          // history.push("/register");
          window.location.href = "/register-kdsh";
        }
      })
      .catch((error) => {
        console.error("Error during authentication:", error);
      });
  }, [location, history]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        opacity: 1,
        transform: "none",
      }}
    >
      <div
        className="loader-container"
        style={{
          alignItems: "center",
          backgroundColor: "initial",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          paddingBottom: "120px",
        }}
      >
        <div
          className={`loader ${isVisible ? "" : "loader-hidden"}`}
          style={{ ...loaderStyle, display: isVisible ? "flex" : "none" }}
        ></div>
        <div
          className="loader-text"
          style={{
            color: "#fff",
            fontSize: "1.5rem",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          {isVisible ? "Wait we are signing you in..." : "Network response was not ok"}
        </div>
      </div>
      <Particless />
    </div>
  );
};

export default GoogleAuthCallback;
